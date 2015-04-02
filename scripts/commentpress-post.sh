#!/bin/bash

# This script assists in converting markdown files for the volume
# Digital Pedagogy into HTML, and them posting them to the CommentPress
# review site. It's written for Linux, and because it uses a recent 
# version of `sed`, it won't work on MacOS. 

# It may be called like this (BASH):

# for file in hybrid interface praxis queer rhetoric video; do path/to/commentpress-post.sh $file; done

# Set the page ID for the page "List of Keywords". This will be used to make
# the keywords child pages of this page.  
KEYWORD_LIST_ID=13

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

#Remove leading YAML block, props to http://stackoverflow.com/a/28222257/584121  
sed -i '1 { /^---/ { :a N; /\n---/! ba; d} }' $1.edited

#Remove markdown title, since we're actually going to use the filename. 
#This removes the first line that starts with #. 
#Props to http://stackoverflow.com/a/3502386/584121
sed -i '0,/^#.*/s/^#.*//' $1.edited

if [ $SHORTNAME = 'welcome' ]
then
	#This document comes first. 
	ORDER=-3
	#This document is not a keyword. 
	KEYWORD=0
fi

#In description.md, change links to select local files
if [ $SHORTNAME = 'description' ]
then 
	#This document comes second. 
	ORDER=-2
	#This document is not a keyword. 
	KEYWORD=0
	sed -i 's#(listOfKeywords.md)#(../Keywords)#g' $1.edited
	sed -i 's#(keywords/!template.md)#(https://github.com/curateteaching/digitalpedagogy/blob/master/keywords/!template.md)#g' $1.edited
fi 

#In listOfKeywords.md, expand the title and fix local links. 
if [ $SHORTNAME = 'listOfKeywords' ] 
then
	#This document comes third. 
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
	#Make keywords child pages of the page called List of Keywords
	KEYWORD_PARAM="--post_parent=$KEYWORD_LIST_ID"

	YEAR=$(date +%Y)
	MONTH=$(date +%m)
	#Change image locations to ones that WP will understand. Change this if it's not January 2015. 
	sed -i "s#(images#(../../files/$YEAR/$MONTH#g" $1.edited

	#Change /files locations to ones that WP will understand. 
	sed -i "s#(files#(../../files/$YEAR/$MONTH#g" $1.edited
else 
	KEYWORD_PARAM=""
fi

#Convert to HTML
pandoc -o $SHORTNAME.html $1.edited 

#Post!
wp post create $SHORTNAME.html --post_type=page --post_status=publish $KEYWORD_PARAM --menu_order="$ORDER" --post_title="$TITLE" --url=digitalpedagogy.commons.mla.org 

#Clean up.
rm $SHORTNAME.html $1.edited 
