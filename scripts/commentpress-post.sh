# Get the basename 
BASENAME=$(basename "$1")

#Get the filename without the extension
SHORTNAME="${BASENAME%.*}"

#Capitlize it for use in the title
CAPITALIZED_SHORTNAME="${SHORTNAME^}"

#Change image locations
cat $1 | sed 's#(images#(../files/2015/01#' > $1.edited

#Convert to HTML
pandoc -o $SHORTNAME.html $1.edited

#Post!
wp post create $SHORTNAME.html --post_type=page --post_title="$CAPITALIZED_SHORTNAME" --url=digitalpedagogy.fitzgerald.mlacommons.org 
