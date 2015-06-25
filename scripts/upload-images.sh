
# Check to make sure $SERVER is set first.
if [ ! -n "$SERVER" ]
then
	echo 'You must set the environment variable $SERVER for this script to work.'
	echo 'E.g., commons.mla.org, or hardy.dev.'
	exit 1
fi

sudo -u www-data wp media import "$1" --title="$1" --url=digitalpedagogy.$SERVER
