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
      var text = i18nMap[lang] && i18nMap[lang]['header_menu.' + key];
      if (text != null) el.textContent = text;
    });

    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.textContent = lang === 'zh-cn' ? 'EN' : '中';
    });

    var hasVisible = false;
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      var elLang = el.getAttribute('data-lang');
      if (!elLang) { el.style.display = ''; return; }
      if (elLang === lang) {
        el.style.display = '';
        hasVisible = true;
      } else {
        el.style.display = 'none';
      }
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
        applyLang(current === 'zh-cn' ? 'en' : 'zh-cn');
      });
    });
  });
})();
