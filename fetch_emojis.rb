#!/usr/bin/env ruby

require 'net/http'
require 'json'
require 'fileutils'

# Fetch emojis from GitHub API
puts "🔧 Fetching emojis from GitHub API..."

uri = URI('https://api.github.com/emojis')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true
http.open_timeout = 10
http.read_timeout = 10

request = Net::HTTP::Get.new(uri.request_uri)
response = http.request(request)

if response.code == '200'
  emojis = JSON.parse(response.body)
  
  # Create _data directory if it doesn't exist
  FileUtils.mkdir_p('_data')
  
  # Write emojis to JSON file
  File.write('_data/emojis.json', JSON.pretty_generate(emojis))
  
  puts "✅ Success: Saved #{emojis.length} emojis to _data/emojis.json"
else
  puts "❌ Failed to fetch emojis (HTTP #{response.code})"
  exit 1
end
