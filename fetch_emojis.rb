#!/usr/bin/env ruby

require 'net/http'
require 'json'
require 'fileutils'

def fetch_from_url(url)
  uri = URI(url)
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.open_timeout = 10
  http.read_timeout = 10

  request = Net::HTTP::Get.new(uri.request_uri)
  response = http.request(request)
  
  return response.body if response.code == '200'
  raise "HTTP Error: #{response.code}"
end



puts "🔧 Fetching emojis from GitHub API..."
begin
  # Create _data directory if it doesn't exist
  FileUtils.mkdir_p('_data')
  
  content = fetch_from_url('https://api.github.com/emojis')
  emojis = JSON.parse(content)  
  File.write('_data/emojis.json', JSON.pretty_generate(emojis))
  
  puts "✅ Success: Saved #{emojis.length} emojis to _data/emojis.json"
rescue StandardError => e
  puts "❌ Failed: #{e.message}"
  exit 1
end

puts "🔧 Fetching emojis Unicode standards..."
begin
  emojis_unicode = fetch_from_url('https://unicode.org/emoji/charts/full-emoji-list.txt')
    
  File.write('_data/emojis-unicode.txt', emojis_unicode)
  puts "✅ Success: Saved emojis unicode data to _data/emojis-unicode.txt"  
rescue StandardError => e
  puts "❌ Failed: #{e.message}"
  exit 1
end
