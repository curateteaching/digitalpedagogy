# Check to make sure $SERVER is set first.
if [ ! -n "$SERVER" ]
then
	echo 'You must set the environment variable $SERVER for this script to work.'
	echo 'E.g., commons.mla.org, or hardy.dev.'
	exit 1
fi

#!/bin/bash
for id in $@; do wp post delete $id --force --url=digitalpedagogy.$SERVER; done
