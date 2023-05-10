/** @format */

export default {
	title: 'Blog - 野路子前端',
	head: [['script', { type: 'module', src: '../public/js/8.13.8/mermaid.min.js' }]],
	//
	alias: {
		vue: 'vue/dist/vue.esm-bundler.js',
	},
	description: 'Just playing around.',
	themeConfig: {
		algolia: {
			appId: '...',
			apiKey: '...',
			indexName: '...',
		},
		siteTitle: '野路子前端 Mr.Han',
		nav: [
			{ text: 'React', link: '/react/index.md' },
			{ text: '前端问题整理', link: '/issues/index.md' },
			{
				text: 'Javascript',
				link: '/javascript/index.md',
			},
			{ text: 'vue2', link: '/vue2/index.md' },
			{
				text: 'css',
				link: '/css/index.md',
			},
			// { text: 'React', link: '/guide' },
			// {
			//   text: 'Dropdown Menu',
			//   items: [
			//     { text: 'Item A', link: '/item-1' },
			//     { text: 'Item B', link: '/item-2' },
			//     { text: 'Item C', link: '/item-3' }
			//   ]
			// }
		],
		sidebar: {
			'/javascript/': [
				{
					text: '前端书籍整理',
					items: [
						{
							text: '编写可维护的javascript - 第一部分 编程风格',
							link: '/javascript/maintainable-javscript/index',
						},
						{
							text: '编写可维护的javascript - 第二部分 编程实践',
							link: '/javascript/maintainable-javscript/index2',
						},
						{
							text: '编写可维护的javascript - 第三部分 编程实践',
							link: '/javascript/maintainable-javscript/index3',
						},
					],
				},
			],

			'/vue2/': [
				{
					items: [
						// This shows `/guide/index.md` page.
						{ text: 'Vue2问题汇总', link: '/vue2/index' },
						{ text: 'Vuex', link: '/vue2/vuex' }, // /guide/index.md
						{
							text: 'Vue Router',
							link: '/vue2/vue-router',
						},
					],
				},
			],
			'/css': [
				{
					text: 'css相关书籍整理',
					items: [
						{
							text: '深入解析CSS - 第一章 层叠、优先级和继承',
							link: '/css/index',
						},
						{
							text: '深入解析CSS - 第二章 相对单位',
							link: '/css/chapter2',
						},
						{
							text: '深入解析CSS - 第三章 盒模型',
							link: '/css/chapter3',
						},
						{
							text: '深入解析CSS - 第四章 理解浮动',
							link: '/css/chapter4',
						},
					],
				},
			],
			// 	{
			// 		text: 'Vue Router',
			// 		items: [
			// 			// This shows `/guide/index.md` page.
			// 			{
			// 				text: 'VueRouter路由初始化',
			// 				link: '/vue/vue-router/index',
			// 			},
			// 		],
			// 	},
			// 	{
			// 		text: 'Vuex',
			// 		items: [
			// 			// This shows `/guide/index.md` page.
			// 			{ text: 'Index', link: '/guide/' }, // /guide/index.md
			// 			{
			// 				text: 'sdsdf',
			// 				link: '/guide',
			// 			},
			// 		],
			// 	},
			// 	{
			// 		text: 'Vite',
			// 		items: [
			// 			// This shows `/guide/index.md` page.
			// 			{ text: 'Index', link: '/guide/' }, // /guide/index.md
			// 			{
			// 				text: 'sdsdf',
			// 				link: '/guide',
			// 			},
			// 		],
			// 	},
			// ],
		},
		// sidebar: [
		//     {
		//       text: 'Vue Router',
		//       items: [
		//         { text: 'Introduction', link: '/introduction' },
		//         { text: 'Getting Started', link: '/get-started' }

		//       ]
		//     },

		//   ]
	},
	markdown: {
		lineNumbers: true,
		// options for markdown-it-anchor
		//  anchor: { permalink: false },
		// options for markdown-it-toc
		// toc: { includeLevel: [1, 2] },
	},
};
