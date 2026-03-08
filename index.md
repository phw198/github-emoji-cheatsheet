---
layout: default
---

👀 To copy to clipboard, double click (or right-click):
* for the markdown code
  * the emoji 
  * the markdown code
* for the emoji itself
  * the unicode value

🔎 <input type="text" id="emojiSearch" placeholder="Search emojis...">

<script>
    document.getElementById('emojiSearch').addEventListener('input', function() {
        filterEmojiTable(this.value);
    });
</script>


## Table of Contents

Click to expand section; Double-click to jump straight to emojis

<script src="{{ '/assets/js/emoji-rotate.js' | relative_url }}"></script>

<ul>
{% for category in site.data.emojis-unicode %}
  {% if category[0] == "Component" %}
    {% continue %}
  {% endif %}
<li class="toc1"><a href="#anchor-{{ category[0] | slugify }}">{{ category[0] }}</a></li>
  <ul id="{{ category[0] }}" class="hidden">
  {% for subcategory in category[1] %}
    {% if subcategory[0] == "subdivision-flag" %}
      {% continue %}
    {% endif %}
    <li class="toc2"><a href="#anchor-{{ subcategory[0] | slugify }}">{{ subcategory[0] }}</a></li>
  {% endfor %}
  </ul>
{% endfor %}
</ul>

<p>&nbsp;</p>
----

{% for category in site.data.emojis-unicode %}
  {% if category[0] == "Component" %}
    {% continue %}
  {% endif %}
# {{ category[0] }}
{: #anchor-{{ category[0] | slugify }} }

  {% for subcategory in category[1] %}
    {% if subcategory[0] == "subdivision-flag" %}
      {% continue %}
    {% endif %}

<section class="subcategory" id="{{ subcategory[0] }}" markdown="1">

## {{ subcategory[0] }}
{: #anchor-{{ subcategory[0] | slugify }} }

Back to: [Category](#anchor-{{ category[0] | slugify }}) &#124; [ToC](#table-of-contents) &#124; [Top](#a-title)
{: .breakcrumb}

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
  
      {% assign emoji_obj = site.data.emojis[unicode_key] %}
      {% if emoji_obj %}
    <tr>
      <td style="text-align:center">
        <div class="emoji-container"><img src="{{ emoji_obj.url }}" alt="{{ emoji_obj.name }}" class="emoji-img" id="{{ emoji_obj.name }}">
          <span class="copy-banner">Copied code!</span>
        </div>
      </td>
      <td><code class="language-plaintext emoji-markdown highlighter-rouge">:{{ emoji_obj.name }}:</code></td>
      <td>{{ emoji.description }}</td>
      <td>
        <code class="language-plaintext emoji-unicode highlighter-rouge" title="{{ emoji_obj.name }}"><nobr>{{ emoji.unicode | join: " " }}</nobr></code>
      </td>
    </tr>
      {% endif %}
    {% endfor %}
</table>
</section>
  {% endfor %}
{% endfor %}

