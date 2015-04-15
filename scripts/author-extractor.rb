require 'yaml'
data = YAML::load(STDIN.read)
out = ''

# How many authors are we dealing with today? 
case data['author'].length 
#If there is one author, don't bother with commas and "and" 
when 1
	author = data['author'][0]
	out += author['given'] + ' ' + author['family']
# If there are two authors, we can have "and," but not a comma. 
when 2
	author = data['author'][0]
	out += author['given'] + ' ' + author['family'] + ' and '
	author = data['author'][1]
	out += author['given'] + ' ' + author['family']
else
	# It's list time! 
	for author in data['author']
		if author == data['author'].last
			out += 'and ' + author['given'] + ' ' + author['family']
		else 
			# Oxford comma. 
			out += author['given'] + ' ' + author['family'] + ', '
		end
	end
end

puts out
