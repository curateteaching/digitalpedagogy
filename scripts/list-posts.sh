# Check to make sure $SERVER is set first. 
if [ ! -n $SERVER ]
then 
	echo 'You must set the environment variable $SERVER for this script to work'
	exit 1
fi

echo "Server is: $SERVER" 

wp post list --post_type=page --url=digitalpedagogy.$SERVER
