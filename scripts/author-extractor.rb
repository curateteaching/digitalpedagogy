require 'yaml'
data = YAML::load(STDIN.read)
puts data['author'][0]['given'] + ' ' + data['author'][0]['family']
