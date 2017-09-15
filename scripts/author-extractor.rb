require 'yaml'
data = YAML::load(STDIN.read)
out = ''

authors = data['author']
authornames = []
for author in authors
	authornames << author['given'] + ' ' + author['family']
end

# How many authors are we dealing with today? 
case authors.length 
#If there is one author, no commas and no "and" 
when 1
	out += authornames[0]
# If there are two authors, we can have "and," but not a comma. 
when 2
	out += authornames[0] + ' and ' + authornames[1] 
else
	# It's list time! 
	for author in authornames 
		if author == authornames.last
			out += 'and ' + author 
		else 
			# Oxford comma. 
			out += author + ', '
		end
	end
end

puts out
