;(function(c){(!window.console||!console.firebug)&&function(){var a=["log","debug","info","warn","error","assert","dir","dirxml","group","groupEnd","time","timeEnd","count","trace","profile","profileEnd"],b=0;for(window.console={};b<a.length;b+=1)window.console[a[b]]=c.noop}();var f=function(a,b){return a.replace(/\{\{([-_a-z]+)\}\}/g,function(a,c){return b[c]?b[c]:"None"})},o=function(a,b){var h="http://github.com/api/v2/json/user/show/"+b.login+"?callback=?",i="http://github.com/api/v2/json/repos/show/"+b.login+"?callback=?",g=c(a).html(f('<div class="ghb_badge {{theme}}"><div class="ghb_badge_header"></div><div class="ghb_user_nav"><a class="ghb_user_info_nav chosen" rel="ghb_badge_user_info" href="#">User Info</a><a class="ghb_user_repo_nav"        rel="ghb_badge_user_repos" href="#">Repos</a></div><div class="ghb_badge_user_info" style="display:none;"><h2>User Info</h2><div></div></div><div class="ghb_badge_user_repos" style="display:none;"><h2>Public {{user_badge_title}}</h2><ul class="ghb_repo_list"></ul><div class="ghb_repo_goto"></div></div></div>',b)),e=g.find(".ghb_badge_header"),j=g.find(".ghb_badge_user_info"),k=g.find(".ghb_repo_goto"),l=g.find(".ghb_repo_list");c.getJSON(h,function(a){var d=c.extend({},b,a.user);e.html(f('<h1><a target="_blank" href="http://github.com/{{login}}">{{login}}\'s GitHub</a> ({{public_repo_count}})</h1>',d));b.include_github_logo&&e.prepend(f('<a target="_blank" href="http://github.com"><img src="{{image_path}}ghb_logo.png" alt="GitHub"></a>',d));j.html(f('<img src="http://www.gravatar.com/avatar/{{gravatar_id}}" />{{name}}<dl><dt>Public Repos:</dt><dd><a target="_blank" href="http://github.com/{{login}}/repositories">{{public_repo_count}}</a></dd><dt>Followers:</dt><dd><a target="_blank" href="http://github.com/{{login}}/followers">{{followers_count}}</a></dd><dt>Following:</dt><dd><a target="_blank" href="http://github.com/{{login}}/following">{{following_count}}</a></dd><dt>Public Gists:</dt><dd><a target="_blank" href="http://gist.github.com/{{login}}">{{public_gist_count}}</a></dd></dl>',d));a.user.public_repo_count>b.repo_count-1?(d.remaining=a.user.public_repo_count-b.repo_count,k.html(f('<a href="http://github.com/{{login}}/repositories">View All {{user_badge_title}} ({{remaining}} More) ... </a>',d))):k.html('<a href="http://github.com/'+b.login+'">'+b.login+" at GitHub</a>");j.show()});c.getJSON(i,function(a){if(a.length===0)l.html('<li class="no_records">'+b.login+" Does Not Have Any Repos</li>");else{var d=[];c.each(a.repositories,function(a,c){d.push(f('<li class="ghb_user_repo_item"><a target="_blank" href="{{url}}">{{name}}</a> <div>{{description}}</div></li>',c));if(a===b.repo_count-1)return!1});b.sorting!=="ascending"&&d.reverse();l.html(d.join("")).children().filter(":first").addClass("firstrepo").end().filter(":last").addClass("lastrepo")}})},p=function(a,b){var h="http://github.com/api/v2/json/repos/show/"+b.login+"/"+b.repo_name+"?callback=?",i="http://github.com/api/v2/json/issues/list/"+b.login+"/"+b.repo_name+"/open?callback=?",g="http://github.com/api/v2/json/commits/list/"+b.login+"/"+b.repo_name+"/"+b.repo_branch+"?callback=?",e=c(a).html(f('<div class="ghb_badge {{theme}}"><div class="ghb_badge_header"></div><div class="ghb_repo_nav"><a class="ghb_repo_info_nav chosen" rel="ghb_repo_info"    href="#">Repo Info</a><a class="ghb_repo_commits_nav"     rel="ghb_repo_commits" href="#">Commits</a><a class="ghb_repo_issues_nav"      rel="ghb_repo_issues"  href="#">Issues</a></div><div class="ghb_repo_info" style="display:none;"></div><div class="ghb_repo_issues" style="display:none;"><h2>Open Issues</h2><ul class="ghb_issue_list"></ul><div class="ghb_repo_goto_issues"></div></div><div class="ghb_repo_commits" style="display:none;"><h2>Commits</h2><ul class="ghb_commit_list"><li class="no_records">There are no commits in the {{repo_branch}} branch</li></ul><div class="ghb_repo_goto_commits"></div></div></div>',b)),j=e.find(".ghb_badge_header"),k=e.find(".ghb_repo_info"),l=e.find(".ghb_issue_list"),m=e.find(".ghb_repo_goto_issues").hide(),d=e.find(".ghb_repo_goto_commits").hide(),n=e.find(".ghb_commit_list");n.find(".no_commits");c.getJSON(h,function(a){j.html('<h1><a target="_blank" href="'+a.repository.url+'">'+a.repository.name+"</a></h1>");b.include_github_logo&&j.prepend(f('<a target="_blank" href="http://github.com"><img src="{{image_path}}ghb_logo.png" alt="GitHub"></a>',b));k.html(f('<p>{{description}}</p><p><a target="_blank" href="{{url}}">{{url}}</a></p><dl class="repo_info_list"><dt>Watchers:</dt><dd>{{watchers}}</dd><dt>Created:</dt><dd>{{created_at}}</dd><dt>Last Updated:</dt><dd>{{pushed_at}}</dd></dl>',a.repository));m.html('<a href="'+a.repository.url+'/issues">View All Issues</a>');d.html('<a href="'+a.repository.url+"/commits/"+b.repo_branch+'">View All Commits</a>');k.show()});c.getJSON(i,function(a){if(a.issues.length===0)l.html('<li class="no_records">There are no open issues for this repo.</li>');else{m.show();var d=[];c.each(a.issues,function(a,e){var h=c.extend({},b,e);d.push(f('<li><a target="_blank" href="http://github.com/{{login}}/{{repo_name}}/issues#issue/{{number}}">{{title}}<span title="{{user}} @ {{created_at}}">by {{user}}</span></a><div>{{body}}</div></li>',h));if(a===b.issue_count-1)return!1});b.sorting!=="ascending"&&d.reverse();l.html(d.join("")).children().filter(":first").addClass("firstrepo").end().filter(":last").addClass("lastrepo")}});c.getJSON(g,function(a){var e=[];c.each(a.commits,function(a,c){e.push('<li><a target="_blank" href="'+c.url+'">'+c.message+'<span title="'+c.author.name+" @ "+c.committed_date+'">by '+c.author.login+"</span></a></li>");if(a===b.commit_count-1)return!1});b.sorting!=="ascending"&&e.reverse();n.html(e.join("")).children().filter(":first").addClass("firstrepo").end().filter(":last").addClass("lastrepo");d.show()})};c.fn.GitHubBadge=function(a){var b=this,a=jQuery.extend({},c.fn.GitHubBadge.defaults,a);console.group("GitHubBadge");console.log("Options parsed as: %o",a);if(!a.login)return console.log("%s",a.login+" is undefined, not doing anything."),this;if(a.kind==="user")o(this,a);else if(a.kind==="project"){if(!a.repo_name)return console.log("%s",a.repo_name+" is undefined, not doing anything."),this;p(this,a)}this.delegate(".ghb_user_nav a, .ghb_repo_nav a","click",function(f){f.preventDefault();var f=b.find(".chosen").removeClass("chosen").attr("rel"),i=c(this).addClass("chosen").attr("rel");b.find("."+f).hide();b.find("."+i)[a.animate_style==="slide"?"slideDown":"show"]()});this.delegate("ul.ghb_repo_list li, ul.ghb_issue_list li","mouseenter",function(){c(this).find("div").show()});this.delegate("ul.ghb_repo_list li, ul.ghb_issue_list li","mouseleave",function(){c(this).find("div").hide()});console.groupEnd();return this};c.fn.GitHubBadge.defaults={login:null,kind:"user",sorting:"ascending",theme:"github",include_github_logo:!0,image_path:"img/",animate_style:"slide",show_repos:!0,user_badge_title:"Repositories",repo_count:"10",repo_name:null,repo_branch:"master",show_issues:!0,issue_count:"10",show_commits:!0,commit_count:"10"}})(jQuery);