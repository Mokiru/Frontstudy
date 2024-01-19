// ==UserScript==
// @name         My first
// @namespace    http://tampermonkey.net/
// @version      2024-01-10
// @description  try to take over the world!
// @author       You
// @match        https://www.bilibili.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @resource     customCSS https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstr
// @require      https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.slim.min.js
// @require      https://cdn.jsdelivr.net/npm/vue
// ==/UserScript==

(function () {
    'use strict';
    // $("head").append($(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css">`));
    $("head").append($('<style>' +
        '.go-top{' +
        'position:fixed;' +
        'bottom:20px;' +
        'right:20px;' +
        '}' +

        '.go-top button{' +
        'display:block;' +
        'text-decoration: none;' +
        'color: #333;' +
        'background-color: #f2f2f2;' +
        'border: 1px solid #ccc;' +
        'padding: 10px 20px;' +
        'border-radius: 5px;' +
        'letter-spacing: 2px;' +
        '}' +
        '</style>'
    ));
    $("body").append($('<div class="go-top">' +
        '</div>'
    )
    );
    let dom = document.querySelector("body > div.go-top");
    let btn = document.createElement('button');
    btn.textContent = '按钮';
    btn.addEventListener('click', () => {
        alert("Hello World!");
    });
    dom.appendChild(btn);

    alert("Hello World!");
    // Your code here...
})();

