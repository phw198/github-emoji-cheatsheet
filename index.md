---
layout: default
---

👀 To copy to clipboard, double click (or right-click):
* for the markdown code `:grinning:`
  * the emoji 
  * the markdown code
* for the emoji itself :grinning:
  * the unicode value

<div style="position: sticky; top: 0; z-index: 1000; background: #151515 url(assets/images/bkg.png) 0 0; padding-top: 10px; padding-bottom: 10px;" id="sticky">
  🔎 <input type="text" id="emojiSearch" placeholder="Search emojis..." size="30"><img class="emoji" src="https://github.githubassets.com/images/icons/emoji/unicode/1f5d1.png" alt="wastebasket" height="20" width="20" style="vertical-align: middle; cursor: pointer; padding-left: 2px;" onClick="javascript:document.getElementById('emojiSearch').value=''; filterEmojiTable();">
</div>

<script>
  document.getElementById('emojiSearch').addEventListener('input', function() {
    filterEmojiTable(this.value);
  });
</script>

<p style="line-height: 0em">&nbsp;</p>

----

<section id="toc" markdown="1">
## Table of Contents
{: style="padding-top:10px"}

:computer_mouse: Click to expand section; Double-click to jump straight to emojis

<script src="{{ '/assets/js/emoji-functions.js' | relative_url }}"></script>

<ul>
{% for category in site.data.emojis-unicode %}
  {% if category[0] == "Component" %}
    {% continue %}
  {% endif %}
  <li class="toc1"><a href="#anchor-{{ category[0] | slugify }}">{{ category[0] }}</a>
    <ul id="toc-{{ category[0] | replace: ' ', '-' }}" class="hidden">
    {% for subcategory in category[1] %}
      {% if subcategory[0] == "subdivision-flag" %}
        {% continue %}
      {% endif %}
      <li class="toc2"><a href="#anchor-{{ subcategory[0] | slugify }}">{{ subcategory[0] }}</a></li>
    {% endfor %}
    </ul>
  </li>
{% endfor %}
</ul>

:ballot_box: Use the [project site](https://github.com/phw198/github-emoji-cheatsheet/issues) to request features or report issues.
{: style="font-size: 0.9em" }

<p style="margin-top: -1em;">&nbsp;</p>
----
</section>

{% for category in site.data.emojis-unicode %}
  {% if category[0] == "Component" %}
    {% continue %}
  {% endif %}

<section class="maincategory" id="{{ category[0] | replace: ' ', '-' }}" markdown="1">
# {{ category[0] }}
{: #anchor-{{ category[0] | slugify }} }

  {% for subcategory in category[1] %}
    {% if subcategory[0] == "subdivision-flag" %}
      {% continue %}
    {% endif %}

<section class="subcategory" id="subcat-{{ subcategory[0] | replace: ' ', '-' }}" markdown="1">

## {{ subcategory[0] }}
{: #anchor-{{ subcategory[0] | slugify }} }

Back to: [Category](#anchor-{{ category[0] | slugify }}) &#124; [ToC](#table-of-contents) &#124; [Top](#a-title)
{: .breakcrumb}

<table>
    <tr>
      <th style="text-align: center; width:60px">Emoji</th>
      <th style="text-align: center; width:40%">Markdown</th>
      <th style="text-align: center; width:40%">Description</th>
      <th>Unicode</th>
    </tr>
    {% for emoji in subcategory[1] %}
      {% assign unicode_key = emoji.unicode | downcase %}
  
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
        <code class="language-plaintext emoji-unicode highlighter-rouge" title="{{ emoji_obj.name }}">{{ emoji.unicode | join: " " }}</code>
      </td>
    </tr>
      {% endif %}
    {% endfor %}
</table>
</section>
  {% endfor %}
</section>
{% endfor %}

