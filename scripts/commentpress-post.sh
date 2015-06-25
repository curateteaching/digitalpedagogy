#!/bin/bash

# This script assists in converting markdown files for the volume
# Digital Pedagogy into HTML, and them posting them to the CommentPress
# review site. It's written for Linux, and because it uses a recent
# version of `sed`, it won't work on MacOS.

# It may be called like this (BASH/ZSH):

# for file in hybrid interface praxis queer rhetoric video; do path/to/commentpress-post.sh $file.md; done

# Set the page ID for the page "List of Keywords". This will be used to make
# the keywords child pages of this page.

# Check to make sure $SERVER is set first.
if [ ! -n "$SERVER" ]
then
	echo 'You must set the environment variable $SERVER for this script to work.'
	echo 'E.g., commons.mla.org, or hardy.dev.'
	exit 1
fi

# Set $YEAR and $MONTH to the year and month the file's images were posted.
YEAR=2015
MONTH=03

# Get the basename
BASENAME=$(basename "$1")

#Get the filename without the extension
SHORTNAME="${BASENAME%.*}"

#Capitlize it for use in the title
TITLE="${SHORTNAME^}"

#Default order is 0. This will effectively alphabetize the keywords.
ORDER=0

#Is the article a keyword? Assume yes.
KEYWORD=1

#Make a temporary copy that we can modify without worrying about corrputing the original.
cp $1 $1.edited

#Remove markdown title, since we're actually going to use the filename.
#This removes the first line that starts with #.
#Props to http://stackoverflow.com/a/3502386/584121
sed -i '0,/^#.*/s/^#.*//' $1.edited

if [ $SHORTNAME = 'welcome' ]
then
	#This document comes first.
	ORDER=-4
	#This document is not a keyword.
	KEYWORD=0
fi

#In description.md, change links to select local files
if [ $SHORTNAME = 'description' ]
then
	#This document comes second.
	ORDER=-3
	#This document is not a keyword.
	KEYWORD=0
	sed -i 's#(listOfKeywords.md)#(../Keywords)#g' $1.edited
	sed -i 's#(keywords/!template.md)#(https://github.com/curateteaching/digitalpedagogy/blob/master/keywords/!template.md)#g' $1.edited
fi


#In howToComment, expand the title and fix local links.
if [ $SHORTNAME = 'howToComment' ]
then
	#This document comes third.
	ORDER=-2
	#This document is not a keyword.
	KEYWORD=0
	# Expand the title.
	TITLE='How to Comment'
fi

#In listOfKeywords.md, expand the title and fix local links.
if [ $SHORTNAME = 'listOfKeywords' ]
then
	#This document comes fourth.
	ORDER=-1
	#This document is not a keyword.
	KEYWORD=0
	# Expand the title.
	TITLE='Keywords'
	# Make local links into WP-friendly links
	sed -i 's#(keywords/\(.*\)\.md)#(../\1)#g' $1.edited

fi

if [ $KEYWORD = 1 ]
then
	KEYWORD_LIST_ID=`wp post list --post_type=page --url=digitalpedagogy.$SERVER | grep keywords | cut -f1`

	if [ ! -n "$KEYWORD_LIST_ID" ]
	then
		echo "Couldn't get the post ID of the Keywords page. Did you remember to post the Keywords page first?"
		exit 1
	fi

	echo "File $SHORTNAME is a keyword. Making this a child post of the Keyword page, which has the ID $KEYWORD_LIST_ID"

	#Make keywords child pages of the page called List of Keywords
	KEYWORD_PARAM="--post_parent=$KEYWORD_LIST_ID"

	#Extract the author's name from the YAML metadata.
	AUTHOR=$(cat $BASENAME | ruby `dirname $0`/author-extractor.rb)

	#Remove leading YAML block, props to http://stackoverflow.com/a/28222257/584121
	sed -i '1 { /^---/ { :a N; /\n---/! ba; d} }' $1.edited

	#Change image locations to ones that WP will understand.
	sed -i "s#(images#(../../files/$YEAR/$MONTH#g" $1.edited

	#Change /files locations to ones that WP will understand.
	sed -i "s#(files#(../../files/$YEAR/$MONTH#g" $1.edited
else
	KEYWORD_PARAM=""
fi

#Convert to HTML
pandoc -o $SHORTNAME.html $1.edited

echo "Title: $TITLE"
echo "Author: $AUTHOR"

#Post!
wp post create $SHORTNAME.html --post_type=page --post_status=publish $KEYWORD_PARAM --menu_order="$ORDER" --post_title="$TITLE" --url=digitalpedagogy.$SERVER > output.txt

#Get the WP post ID for the page we just posted, so that we can reference it in the meta below.
POST_ID=$(cat output.txt | grep 'Success: Created post' | sed -e 's/[^0-9]//g')

if [ -n "$AUTHOR" ]
then
	wp post meta add $POST_ID author "$AUTHOR" --url=digitalpedagogy.$SERVER
fi

#Clean up.
rm $SHORTNAME.html $1.edited output.txt
