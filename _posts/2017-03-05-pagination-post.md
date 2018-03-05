---
layout: post
title: "Pagination Post"
author: "Chester"
---

Here we see **Tale's** pagination feature in action. It is set to 5 posts per page by default. Feel free to change this number in the `_config.yml` file!
{% highlight ruby %}
def show
  @widget = Widget(params[:id])
  respond_to do |format|
    format.html # show.html.erb
    format.json { render json: @widget }
  end
end
{% endhighlight %}