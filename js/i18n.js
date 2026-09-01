(function () {
  'use strict';

  var i18nMap = {
    'zh-cn': {
      'nav.more': '更多',
      'nav.home': '主页',
      'nav.tags': '标签',
      'nav.archives': '归档',
      'nav.about': '关于',
      'nav.search': '搜索',
      'nav.category': '分类：',
      'nav.toggle_bar': '菜单按钮',
      'toc.title': '目录',
      'post.postTime': '发布于',
      'post.tags': '标签',
      'post.visit': '访问',
      'post.donate': '赞赏',
      'post.comments': '留言评论',
      'post.excerpt_link': '更多',
      'search.search': '搜索',
      'search.total': '共',
      'search.counts': '条搜索结果。',
      'article.hits': '访问',
      'article.copyright': '版权声明：',
      'not_found': '404没找到咯~',
      'icp': 'icp备案',
      'header_menu.关于': '关于',
      'header_menu.ENG': 'EN',
      'menu.Archives': '归档',
      'menu.Tags': '标签',
      'menu.技术分享': '技术分享',
      'menu.评测': '评测',
      'menu.学习': '学习',
      'menu.音乐': '音乐',
      'menu.随笔': '随笔',
      'menu.友情链接': '友情链接',
      'menu.更新日志': '更新日志',
      'link.关于': '/about',
      'link.友情链接': '/friendlink',
      'link.更新日志': '/changelog',
      'link.技术分享': '/categories/技术分享/',
      'link.评测': '/categories/评测/',
      'link.学习': '/categories/学习/',
      'link.音乐': '/categories/音乐/',
      'link.随笔': '/categories/随笔/',
      'lang_empty': '暂无该语言的文章'
    },
    'en': {
      'nav.more': 'More',
      'nav.home': 'Home',
      'nav.tags': 'Tags',
      'nav.archives': 'Archives',
      'nav.about': 'About',
      'nav.search': 'Search',
      'nav.category': 'Category:',
      'nav.toggle_bar': 'menu button',
      'toc.title': 'In this article',
      'post.postTime': 'Post',
      'post.tags': 'Tags',
      'post.visit': 'Visit',
      'post.donate': 'donate',
      'post.comments': 'Comments',
      'post.excerpt_link': 'more',
      'search.search': 'search',
      'search.total': '',
      'search.counts': 'search result(s) in total.',
      'article.hits': 'hits',
      'article.copyright': 'Copyright: ',
      'not_found': '404 Not found.',
      'icp': 'icp Record',
      'header_menu.关于': 'About',
      'header_menu.ENG': 'English',
      'menu.Archives': 'Archives',
      'menu.Tags': 'Tags',
      'menu.技术分享': 'Tech',
      'menu.评测': 'Reviews',
      'menu.学习': 'Study',
      'menu.音乐': 'Music',
      'menu.随笔': 'Essays',
      'menu.友情链接': 'Friends',
      'menu.更新日志': 'Changelog',
      'link.关于': '/en/about',
      'link.友情链接': '/en/friendlink',
      'link.更新日志': '/en/changelog',
      'link.技术分享': '/categories/Tech/',
      'link.评测': '/categories/Reviews/',
      'link.学习': '/categories/Learning/',
      'link.音乐': '/categories/Music/',
      'link.随笔': '/categories/Essays/',
      'lang_empty': 'No articles in this language yet'
    }
  };

  function getDefaultLang() {
    var htmlLang = document.documentElement.lang;
    if (htmlLang && htmlLang.indexOf('zh') === 0) return 'zh-cn';
    return 'en';
  }

  function getSavedLang() {
    var saved = localStorage.getItem('blog_lang');
    if (saved === 'zh-cn' || saved === 'en') return saved;
    return null;
  }

  function applyLang(lang) {
    localStorage.setItem('blog_lang', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var text = i18nMap[lang] && i18nMap[lang][key];
      if (text != null) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else if (el.tagName === 'IMG') {
          el.alt = text;
        } else {
          el.textContent = text;
        }
      }
    });

    document.querySelectorAll('[data-i18n-menu]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-menu');
      var langMap = i18nMap[lang];
      var text = null;
      if (langMap) {
        text = langMap['menu.' + key] || langMap['header_menu.' + key];
      }
      if (text != null) el.textContent = text;
    });

    document.querySelectorAll('[data-i18n-link]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-link');
      var url = i18nMap[lang] && i18nMap[lang]['link.' + key];
      if (url != null) el.href = url;
    });

    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.textContent = lang === 'zh-cn' ? 'EN' : '中';
    });

    var hasVisible = false;
    document.querySelectorAll('[data-lang]:not(#post)').forEach(function (el) {
      var elLang = el.getAttribute('data-lang');
      if (!elLang) { el.style.display = ''; return; }
      if (elLang === lang) {
        el.style.display = '';
        hasVisible = true;
      } else {
        el.style.display = 'none';
      }
    });

    // 按语言过滤侧边栏 Tags 组件
    document.querySelectorAll('[data-langs]').forEach(function (el) {
      var langs = (el.getAttribute('data-langs') || '').split(/\s+/);
      el.style.display = langs.indexOf(lang) !== -1 ? '' : 'none';
    });

    // 分类等页面：按页面自身语言显示文章，
    // 避免保存的语言与页面语言不一致时出现空白
    document.querySelectorAll('[data-lang-scope]').forEach(function (scope) {
      var scopeLang = scope.getAttribute('data-lang-scope');
      if (!scopeLang) return;
      scope.querySelectorAll('[data-lang]').forEach(function (el) {
        el.style.display = el.getAttribute('data-lang') === scopeLang ? '' : 'none';
      });
    });

    document.querySelectorAll('.lang-empty-message').forEach(function (el) {
      var postList = el.closest('[data-page]') || document.querySelector('.content');
      if (postList) {
        var langEls = postList.querySelectorAll('[data-lang]');
        var anyVisible = false;
        langEls.forEach(function (p) { if (p.style.display !== 'none') anyVisible = true; });
        el.style.display = anyVisible ? 'none' : '';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var lang = getSavedLang() || getDefaultLang();
    applyLang(lang);

    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var current = document.documentElement.lang;
        var target = current === 'zh-cn' ? 'en' : 'zh-cn';

        var articleEl = document.querySelector('[data-lang-alt-url]');
        if (articleEl) {
          var altUrl = articleEl.getAttribute('data-lang-alt-url');
          if (altUrl) {
            localStorage.setItem('blog_lang', target);
            window.location.href = altUrl;
            return;
          }
        }

        applyLang(target);
      });
    });
  });
})();
