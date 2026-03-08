---
layout: default
---

Double (or right-click) an emoji (or its code) to copy to clipboard


## Table of Contents

Click to expand section; Double-click to jump straight to emojis

<script src="{{ '/assets/js/emoji-rotate.js' | relative_url }}"></script>

<ul>
{% for category in site.data.emojis-unicode %}
<li class="toc1"><a href="#{{ category[0] | slugify }}">{{ category[0] }}</a></li>
  <ul id="{{ category[0] }}" class="hidden">
{% for subcategory in category[1] %}
  <li class="toc2"><a href="#{{ subcategory[0] | slugify }}">{{ subcategory[0] }}</a></li>
{% endfor %}
  </ul>
{% endfor %}
</ul>

<p>&nbsp;</p>
----

{% for category in site.data.emojis-unicode %}
# {{ category[0] }}
{: #{{ category[0] | slugify }} }
{% for subcategory in category[1] %}
## {{ subcategory[0] }}
{: #{{ subcategory[0] | slugify }} }

<table>
    <tr>
    <th style="text-align: center">Emoji</th><th>Markdown</th><th>Description</th><th>Unicode</th>
    </tr>
{% for emoji in subcategory[1] %}
  {% if emoji.unicode.size > 1 %}
    {% capture unicode_key %}{{ emoji.unicode | first | downcase }}-{{ emoji.unicode | last | downcase }}{% endcapture %}
  {% else %}
    {% assign unicode_key = emoji.unicode | first | downcase %}
  {% endif %}
  {% for emoji_entry in site.data.emojis %}
    {% assign emoji-gh-markdown = null %}
    {% assign emoji_obj = null %}
    {% if emoji_entry[1].unicode == unicode_key %}
      {% assign emoji-gh-markdown = emoji_entry[0] %}
      {% assign emoji_obj = emoji_entry[1] %}
      {% break %}
    {% endif %}
  {% endfor %}
  {% if emoji-gh-markdown != null %}
  <tr>
    <td style="text-align:center">
      <div class="emoji-container"><img src="{{ emoji_obj.url }}" alt="{{ emoji-gh-markdown }}" class="emoji-img" id="{{ emoji-gh-markdown }}">
        <span class="copy-banner">Copied code!</span>
      </div>
    </td>
    <td><code class="language-plaintext emoji-markdown highlighter-rouge">:{{ emoji-gh-markdown }}:</code></td>
    <td>{{ emoji.description }}</td>
    <td>
      <code class="language-plaintext emoji-unicode highlighter-rouge" title="{{ emoji-gh-markdown }}">{{ emoji.unicode | join: " " }}</code>
    </td>
  </tr>
  {% endif %}
{% break %}
{% endfor %}
</table>

{% break %}
{% endfor %}
{% endfor %}

