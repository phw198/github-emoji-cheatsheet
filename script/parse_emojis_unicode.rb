#!/usr/bin/env ruby
# frozen_string_literal: true

require "json"

def parse_emojis_unicode(input_file, output_file)
  emojis = {}
  current_category = nil
  current_subcategory = nil

  File.readlines(input_file).each do |line|
    line.strip!
    next if line.empty?

    case line
    when /^@@(.+)/
      # Major category
      current_category = $1
      emojis[current_category] = {}
      puts "📁 Category: #{current_category}"
    when /^@(.+)/
      # Subcategory
      current_subcategory = $1
      emojis[current_category][current_subcategory] = [] if current_category
      puts "  📂 Subcategory: #{current_subcategory}"
    else
      # Tab-delimited emoji data
      if current_category && current_subcategory
        parts = line.split("\t")
        if parts.length >= 2
          unicode_str = parts[0]
          description = parts[1]

          # Split unicode by whitespace into individual elements
          unicode_codes = unicode_str.split(/\s+/)

          emojis[current_category][current_subcategory] << {
            unicode: unicode_codes,
            description: description
          }
        end
      end
    end
  end

  # Write to JSON file
  File.write(output_file, JSON.pretty_generate(emojis))
  puts "\n✅ Success: Saved emojis to #{output_file}"
  emojis
end

# Parse the emojis-unicode.txt file
parse_emojis_unicode("_data/emojis-unicode.txt", "_data/emojis-unicode.json")
