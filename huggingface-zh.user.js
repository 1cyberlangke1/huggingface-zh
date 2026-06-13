// ==UserScript==
// @name         Hugging Face 中文化插件
// @namespace    https://github.com/1cyberlangke1/huggingface-zh
// @description  中文化 Hugging Face 界面的菜单及内容
// @version      0.2.1
// @author       1cyberlangke1
// @license      MIT
// @match        https://huggingface.co/*
// @run-at       document-start
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @supportURL   https://github.com/1cyberlangke1/huggingface-zh/issues
// ==/UserScript==

(function (window, document, undefined) {
  "use strict";

  /* ========================================================================
   *  词库
   * ======================================================================== */
  const I18N = {};

  I18N.conf = {
    characterDataPages: ["models", "datasets", "spaces", "model-detail", "settings", "public", "profile", "discussions"],
    ignoreSelectors: {
      "*": [
        "pre",
        ".language-",
        ".math",
        "math",
        ".markdown-body",
        ".model-card-content",
        ".blog-content",
        ".prose-doc",
        ".prose-card",
        ".hf-sanitized",
        "relative-time",
        '[data-testid="breadcrumb"]',
      ],
      "model-detail": [".code-block-wrapper"],
      "dataset-detail": [],
      "space-detail": [],
    },
  };

  I18N["zh-CN"] = {
    /*
     *  ===== 词库维护指南 =====
     *
     *  添加新翻译：
     *    在下面 public.static 里加一行：
     *      '英文原文':    '中文翻译',
     *    注意冒号对齐，缩进用 4 空格
     *
     *  删除翻译：
     *    直接删掉那一行即可
     *
     *  正则翻译（public.regexp）：
     *    用于处理动态文本，如 "Updated 3 days ago"
     *    格式：[ /匹配正则/, '替换文本' ],
     *    $1/$2 引用正则里括号捕获的内容
     *
     *  选择器翻译（public.selector）：
     *    用于直接通过 CSS 选择器改元素文本
     *    格式：[ "CSS选择器", '替换文本' ],
     *
     *  标题翻译（public.title）：
     *    static 精确匹配页面标题
     *    regexp 正则匹配页面标题
     *
     *  注意事项：
     *    - 英文原文必须完全匹配页面上的文本（大小写敏感）
     *    - 键值一样的条目不需要加（如 'PyTorch': 'PyTorch'）
     *    - 模型名/库名等专有名词不要翻译
     *    - B/k/M 等缩写不要翻译
     *    - 删了条目后记得确认该文本在页面上可有可无
     */

    /* ---- 公共翻译（所有页面通用） ---- */
    public: {
      static: {
        // 导航栏
        "Models": "模型",
        "Datasets": "数据集",
        "Spaces": "应用空间",
        "Buckets": "存储桶",
        "Docs": "文档",
        "Enterprise": "企业版",
        "Pricing": "定价",
        "Tasks": "任务",
        "Collections": "收藏集",
        "collections": "收藏集",
        "models": "模型",
        "Languages": "语言",
        "Organizations": "组织",
        "All": "所有",
        "Blog": "博客",
        "Posts": "帖子",
        "Papers": "论文",
        "Daily Papers": "每日论文",
        "Dataset": "数据集",
        "dataset": "数据集",
        "model": "模型",
        "Likes": "点赞",
        "Upvotes": "赞同",
        "Learn": "学习",
        "Forum": "论坛",
        "Log In": "登录",
        "Sign Up": "注册",

        // 解决方案
        "Team & Enterprise": "团队与企业版",
        "Hugging Face PRO": "Hugging Face PRO",
        "Enterprise Support": "企业支持",
        "Inference Providers": "推理供应商",
        "Inference Endpoints": "推理端点",
        "Storage": "存储",
        "Storage Buckets": "存储桶",

        // 存储页
        "Storage built for AI teams": "为 AI 团队打造的存储",
        "Xet Technology": "Xet 技术",
        "Next-gen large-scale storage for AI": "下一代 AI 大规模存储",
        "Transparent, volume-based pricing": "透明，按量计费",
        "Data Storage": "数据存储",
        "Assemble training data at any scale": "任意规模地组装训练数据",
        "Compute Agnostic": "计算无关",
        "Your data, independent of your compute": "你的数据，独立于你的计算",
        "Built-in CDN for blazing fast access": "内置 CDN，极速访问",
        "Coding Agents": "编码智能体",
        "Give your coding agents persistent storage": "为你的编码智能体提供持久存储",
        "Enterprise-grade security at every layer": "每一层的企业级安全",
        "Create a Bucket": "创建存储桶",
        "Get started for free with your first bucket": "免费创建你的第一个存储桶",
        "Get a Storage package": "获取存储套餐",
        "Simple per-TB pricing that scales with you": "按 TB 计费，随你扩展",
        "Dedicated governance and shared quotas at scale": "专用治理和大规模共享配额",
        "Read jasperai story": "阅读 jasperai 案例",
        "AES-256 Encryption": "AES-256 加密",
        "End-to-end encryption at rest and in transit": "静态和传输中的端到端加密",
        "Full visibility into every access event": "全面查看每一次访问事件",
        "SSO & RBAC": "SSO 与 RBAC",
        "Enterprise SSO with role-based access control": "企业 SSO 与基于角色的访问控制",
        "US & EU Regions": "美国与欧洲区域",
        "Choose where your data lives": "选择你的数据存放地点",
        "Gray = already stored": "灰色 = 已存储",
        "Purple = only the changed chunk": "紫色 = 仅变更的块",
        "Trusted by more than 10,000 AI teams": "受到 10,000+ AI 团队的信任",
        "Start with buckets, sync your AI data, and unlock object storage built for ML workflows.":
          "从存储桶开始，同步你的 AI 数据，解锁为 ML 工作流构建的对象存储",
        "Store models, datasets, and artifacts with simple per-TB pricing.":
          "以简单的按 TB 定价存储模型、数据集和工件",
        "Store models, datasets, and artifacts with simple per-TB pricing. Built-in CDN, Xet deduplication, and no git overhead.":
          "以简单的按 TB 定价存储模型、数据集和工件。内置 CDN、Xet 去重，无 Git 开销",

        // 新建存储桶页
        "Create a new Storage Bucket": "创建新的存储桶",
        "Owner": "拥有者",
        "Bucket name": "存储桶名称",
        "CDN Pre-warming": "CDN 预热",
        "Pre-warm your bucket on specific regions for faster downloads. Additional charges apply per region.":
          "在特定区域预热你的存储桶以加快下载速度。每个区域额外收费",
        "Storage is included in your plan. CDN pre-warming is billed per region.":
          "存储已包含在你的套餐中。CDN 预热按区域计费",
        "Public": "公开",
        "Private": "私有",
        "New Bucket name": "新存储桶名称",
        "New model name": "新模型名称",
        "Collection Name": "收藏集名称",
        "Create Bucket": "创建存储桶",
        "Creating Bucket": "正在创建存储桶",
        "Once your Bucket is created, you can upload files using":
          "创建存储桶后，你可以使用以下方式上传文件",
        "are large-scale object storage without git constraints.": "是无 Git 约束的大规模对象存储",
        "Anyone on the internet can see this Bucket. Only you (personal Bucket) or members of your organization (organization Bucket) can upload files.":
          "互联网上的任何人都可以查看此存储桶。只有你（个人存储桶）或组织成员（组织存储桶）可以上传文件",
        "Only you (personal Bucket) or members of your organization (organization Bucket) can see and upload files to this Bucket.":
          "只有你（个人存储桶）或组织成员（组织存储桶）可以查看和上传文件到此存储桶",
        "Optimized for AI workloads with Xet deduplication and included CDN.":
          "针对 AI 工作负载优化，支持 Xet 去重和内置 CDN",
        "Powered by": "由",
        "Xet - Thanks to Xet": "Xet 提供支持 — 感谢 Xet",
        "deduplication technology": "去重技术",
        ", duplication is near instant.": "，复制近乎即时完成。",
        "or the web interface.": "或 Web 界面",
        "Tip:": "提示：",
        "Install the official": "安装",
        "so your AI agents can manage Buckets directly.": "，让你的 AI 代理直接管理存储桶",
        "so your AI agents can manage models directly.": "，让你的 AI 代理直接管理模型",
        "so your AI agents can manage datasets directly.": "，让你的 AI 代理直接管理数据集",
        "so your AI agents can manage Spaces directly.": "，让你的 AI 代理直接管理应用空间",
        "GCP — US East": "GCP — 美国东部",
        "South Carolina": "南卡罗来纳",
        "GCP — EU West": "GCP — 欧洲西部",
        "Netherlands": "荷兰",
        "AWS — US East": "AWS — 美国东部",
        "Virginia": "弗吉尼亚",
        "AWS — EU West": "AWS — 欧洲西部",
        "Ireland": "爱尔兰",

        // 存储桶详情页
        "Buckets:": "存储桶：",
        "Files": "文件",
        "Settings": "设置",
        "Getting started with your bucket": "存储桶快速入门",
        "Upload via the web": "通过网页上传",
        "Upload files directly from the browser using the web uploader.":
          "直接从浏览器使用网页上传工具上传文件",
        "Upload files": "上传文件",
        "Upload your bucket files": "上传存储桶文件",
        "Use": "使用",
        "to upload a local folder to this bucket.": "将本地文件夹上传到该存储桶",
        "Sync this bucket": "同步此存储桶",
        "Mount this bucket": "挂载此存储桶",
        "Total size": "总大小",
        "Last updated": "最后更新",
        "Pre-warmed CDN": "CDN 预热",

        // 存储桶设置页
        "Pre-warm your bucket on specific cloud regions for faster downloads. Files are replicated to edge nodes closest to your users.":
          "在特定云区域预热你的存储桶以加快下载速度。文件会复制到离用户最近的边缘节点",
        "Save CDN settings": "保存 CDN 设置",
        "Change Bucket visibility": "更改存储桶可见性",
        "This Bucket is currently": "此存储桶当前为",
        "public": "公开",
        "Trusted Publishers": "受信任的发布者",
        "Allow CI/CD workflows to push to this bucket without long-lived tokens.":
          "允许 CI/CD 工作流向此存储桶推送，无需长期令牌",
        "No trusted publishers configured": "未配置受信任的发布者",
        "Add trusted publisher": "添加受信任的发布者",
        "Rename or transfer this bucket": "重命名或转移此存储桶",
        "All links to this bucket will automatically redirect to the new location.":
          "此存储桶的所有链接将自动重定向到新位置",
        "New owner": "新拥有者",
        "New name": "新名称",
        "New bucket name": "新存储桶名称",
        "I understand, move this bucket": "我了解，移动此存储桶",
        "Delete this Bucket": "删除此存储桶",
        "This action": "此操作",
        "cannot": "无法",
        "be undone. This will permanently delete the": "撤消。这将永久删除",
        "Bucket and all its files.": "存储桶及其所有文件",

        // 受信任发布者表单
        "Provider": "供应商",
        "GitHub Actions": "GitHub Actions",
        "GitLab CI": "GitLab CI",
        "CircleCI": "CircleCI",
        "Bitbucket Pipelines": "Bitbucket Pipelines",
        "Custom": "自定义",
        "Repository": "仓库",
        "Branch (optional)": "分支（可选）",
        "Branch": "分支",
        "Workflow": "工作流",
        "For tag-based publishing, use the Custom OIDC provider with ref=refs/tags/{tag}.":
          "对于基于标签的发布，请使用自定义 OIDC 供应商，ref=refs/tags/{tag}",
        "Workflow (optional)": "工作流（可选）",
        "Workflow filename in .github/workflows/.": "工作流文件名位于 .github/workflows/ 中",
        "Add publisher": "添加发布者",
        "octocat/my-model": "用户名/仓库名",

        // 删除确认弹窗
        "Delete Bucket": "删除存储桶",
        "Please type": "请输入",
        "to confirm.": "以确认",
        "I understand, delete this Bucket": "我了解，删除此存储桶",

        // 存储桶上传页
        "Upload file(s)": "上传文件",
        "Drag files/folders here or click to browse from your computer.":
          "将文件/文件夹拖到此处，或点击浏览从电脑中选择",

        // 首页
        "The AI community building the future.": "构建未来的 AI 社区",
        "Trending on": "本周热门",
        "this week": "本周",
        "Explore AI Apps": "探索 AI 应用",
        "Browse 2M+ models": "浏览 200 万+ 模型",
        "Browse 1M+ applications": "浏览 100 万+ 应用",
        "Browse 500k+ datasets": "浏览 50 万+ 数据集",

        // Home of ML 区块
        "The Home of Machine Learning": "机器学习之家",
        "Create, discover and collaborate on ML better.": "更好地创建、发现和协作机器学习",
        "The collaboration platform": "协作平台",
        "Host and collaborate on unlimited public models, datasets and applications.":
          "托管和协作无限数量的公共模型、数据集和应用",
        "Move faster": "更快推进",
        "With the HF Open source stack.": "借助 Hugging Face 开源技术栈",
        "Explore all modalities": "探索所有模态",
        "Text, image, video, audio or even 3D.": "文本、图像、视频、音频甚至 3D",
        "Build your portfolio": "打造你的作品集",
        "Create new Space": "创建新空间",
        "Read the documentation": "阅读文档",
        "Watch intro guide": "观看入门指南",
        "Get started quickly": "快速开始",
        "Optimized for AI": "为 AI 优化",
        "Craft collaboratively": "协同创作",
        "Build it your way": "按你的方式构建",
        "Various Hardware": "多种硬件",
        "Enter Dev Mode": "进入开发模式",
        "Soon": "即将推出",
        "Explore Spaces built by the community": "探索社区构建的应用空间",
        "Try out over": "尝试超过",
        "Explore all": "探索全部",
        "Frequently Asked Questions": "常见问题",
        "Share your work with the world and build your ML profile.":
          "与世界分享你的工作，建立你的机器学习档案",

        // Accelerate your ML
        "Accelerate your ML": "加速机器学习",
        "We provide paid Compute and Enterprise solutions.": "我们提供付费计算和企业解决方案",
        "Give your team the most advanced platform to build AI with enterprise-grade security, access controls and dedicated support.":
          "为团队提供最先进的 AI 构建平台，具备企业级安全、访问控制和专属支持",
        "Getting started": "开始使用",
        "Getting Started": "开始使用",
        "Starting at $20/user/month": "每位用户每月 $20 起",
        "Single Sign-On": "单点登录",
        "Regions": "区域",
        "Priority Support": "优先支持",
        "Audit Logs": "审计日志",
        "Resource Groups": "资源组",
        "Private Datasets Viewer": "私有数据集查看器",
        "Access 45,000+ models from leading AI providers through a single, unified API with no service fees.":
          "通过统一 API 访问来自领先提供商的 45000+ 模型，无服务费",
        "Explore Models": "探索模型",
        "Compute": "计算",
        "Deploy on optimized Inference Endpoints or update your Spaces applications to a GPU in a few clicks.":
          "部署在优化的推理端点上，或一键将应用空间升级到 GPU",
        "View pricing": "查看定价",
        "Starting at $0.60/hour for GPU": "GPU 每小时 $0.60 起",

        // Our Open Source
        "Our Open Source": "我们的开源项目",
        "We are building the foundation of ML tooling with the community.":
          "我们与社区共同构建机器学习工具的基础",
        "State-of-the-art AI models for PyTorch": "PyTorch 前沿 AI 模型",
        "State-of-the-art Diffusion models in PyTorch": "PyTorch 前沿扩散模型",
        "Safe way to store/distribute neural network weights": "安全存储/分发神经网络权重",
        "Python client to interact with the Hugging Face Hub":
          "与 Hugging Face Hub 交互的 Python 客户端",
        "Fast tokenizers optimized for research & production": "为研究和生产优化的快速分词器",
        "Train transformers LMs with reinforcement learning":
          "使用强化学习训练 Transformer 语言模型",
        "State-of-the-art ML running directly in your browser": "直接在浏览器中运行的前沿机器学习",
        "Smol library to build great agents in Python": "用 Python 构建智能体的轻量库",
        "Parameter-efficient finetuning for large language models": "大语言模型的参数高效微调",
        "Access & share datasets for any ML tasks": "访问和分享任何机器学习任务的数据集",
        "Serve language models with TGI optimized toolkit": "使用 TGI 优化工具包服务语言模型",
        "Train PyTorch models with multi-GPU, TPU, mixed precision":
          "使用多 GPU、TPU、混合精度训练 PyTorch 模型",

        // 组织中
        "More than 50,000 organizations are using Hugging Face":
          "超过 50,000 个组织正在使用 Hugging Face",

        // 页脚
        "System theme": "系统主题",
        "Light theme": "浅色主题",
        "Dark theme": "深色主题",
        "Light": "浅色",
        "Dark": "深色",
        "System": "系统",
        "TOS": "服务条款",
        "Privacy": "隐私政策",
        "About": "关于",
        "Careers": "招聘",
        "Website": "网站",
        "Company": "公司",
        "Resources": "资源",
        "Social": "社交",
        "Changelog": "更新日志",
        "Keep track of latest changes on the Hugging Face Hub": "跟踪 Hugging Face Hub 的最新变更",
        "Brand assets": "品牌资源",
        "Terms of service": "服务条款",
        "Press": "新闻",
        "Documentation": "文档",
        "Service Status": "服务状态",
        "Speed test": "速度测试",

        // 列表页公共
        "Edit Models filters": "编辑模型筛选",
        "Edit Datasets filters": "编辑数据集筛选",
        "Edit Spaces filters": "编辑应用筛选",
        "Main": "主要",
        "Libraries": "框架库",
        "Licenses": "许可证",
        "Other": "其他",
        "Parameters": "参数量",
        "Reset Parameters": "重置参数",
        "Reset Modalities": "重置模态",
        "Reset Tasks": "重置任务",
        "Apply filters": "应用筛选",
        "Base only": "仅基础模型",
        "Inference Available": "推理可用",
        "Inference": "推理",
        "Add filters": "添加筛选",
        "Sort: Trending": "排序: 热门",
        "Sort: Relevance": "排序: 相关度",
        "Relevance": "相关度",
        "Sort: Most Downloads": "排序: 下载最多",
        "Sort: Most downloads": "排序: 下载最多",
        "Sort: Newest": "排序: 最新",
        "Sort: Most likes": "排序: 最多点赞",
        "Sort: Most reactions": "排序: 最多回应",
        "Sort: Recently created": "排序: 最近创建",
        "Sort: Recently updated": "排序: 最近更新",
        "Sort: Most rows": "排序: 行数最多",
        "Sort: Least rows": "排序: 行数最少",
        "Sort: Most parameters": "排序: 参数量最多",
        "Sort: Least parameters": "排序: 参数量最少",
        "Most parameters": "参数量最多",
        "Least parameters": "参数量最少",
        "Sort: Alphabetical": "排序: 字母顺序",
        "Alphabetical": "字母顺序",
        "Sort: Largest total size": "排序: 总大小最大",
        "Sort: Smallest total size": "排序: 总大小最小",
        "Most likes": "最多点赞",
        "Most downloads": "下载最多",
        "Recently created": "最近创建",
        "Recently updated": "最近更新",
        "Most rows": "行数最多",
        "Least rows": "行数最少",
        "Largest total size": "总大小最大",
        "Smallest total size": "总大小最小",
        "Full-text search": "全文搜索",
        "Previous": "上一页",
        "Next": "下一页",

        // 模型/数据集/Spaces 详情页公共
        "Overview": "概览",
        "Model Card": "模型卡片",
        "Dataset Card": "数据集卡片",
        "Community": "社区",
        "Discussions": "讨论",
        "Inference API": "推理 API",
        "Use this model": "使用此模型",
        "Deploy": "部署",
        "Download": "下载",
        "Like": "点赞",
        "Copy": "复制",
        "Copied": "已复制",
        "Config": "配置",
        "License": "许可协议",

        // 模型详情页
        "Architecture": "架构",
        "Limitations": "限制",
        "Training": "训练",
        "Evaluation": "评估",
        "Citation": "引用",
        "Precision": "精度",
        "Format": "格式",
        "Size": "大小",
        "(rows)": "(行数)",
        "Uses": "用途",
        "How to use": "使用方法",
        "Intended use": "预期用途",

        // 数据集详情页
        "Preview": "预览",
        "Data": "数据",
        "Splits": "拆分",
        "Features": "特征",

        // Space 详情页
        "App": "应用",
        "Source": "源代码",
        "Hardware": "硬件",
        "Duplicated from": "复刻自",
        "Running on": "运行环境",

        // 登录页
        "With your Hugging Face Account": "使用你的 Hugging Face 账户",
        "Username or Email address": "用户名或邮箱地址",
        "Password": "密码",
        "Forgot your password?": "忘记密码？",
        "Login": "登录",
        "Don't have an account?": "还没有账户？",
        "Unlock SSO with Team & Enterprise": "使用团队与企业版解锁单点登录",

        // 设置页
        "Profile": "个人资料",
        "Account": "账户",
        "Emails": "邮箱",
        "Notifications": "通知",
        "Billing": "账单",
        "API Tokens": "API 令牌",
        "Connected Apps": "已关联的应用",
        "SSO": "单点登录",
        "Preferences": "偏好设置",
        "Bio": "个人简介",
        "Location": "位置",
        "Avatar": "头像",
        "Save": "保存",
        "Saved": "已保存",
        "Cancel": "取消",
        "Delete": "删除",
        "Edit": "编辑",
        "Update": "更新",
        "Create": "创建",

        // 通用操作
        "Search": "搜索",
        "Search models": "搜索模型",
        "Search datasets": "搜索数据集",
        "Search spaces": "搜索应用",
        "Search models, datasets, users...": "搜索模型、数据集、用户...",
        "Ask anything you want to do with AI": "询问你想用 AI 做什么",
        "Use full-text search": "使用全文搜索",
        "Use Full-text search": "使用全文搜索",
        "Filter": "筛选",
        "Clear": "清除",
        "Close": "关闭",
        "Open": "打开",
        "Back": "返回",
        "More": "更多",
        "Less": "收起",
        "Show more": "展开更多",
        "Learn more": "了解更多",
        "View all": "查看全部",
        "See all": "查看全部",
        "Submit": "提交",
        "Confirm": "确认",
        "Loading": "加载中",
        "Loading...": "加载中...",
        "Error": "错误",
        "Success": "成功",
        "Warning": "警告",
        "Info": "信息",
        "Help": "帮助",
        "Feedback": "反馈",
        "Report": "报告",

        // 用户菜单
        "New": "新建",
        "Your Profile": "个人主页",
        "Your Stars": "你的星标",
        "Your Datasets": "你的数据集",
        "Your Spaces": "你的空间",
        "Your Collections": "你的收藏集",
        "Sign Out": "退出登录",
        "Inbox": "收件箱",
        "Create New": "新建",
        "Get PRO": "升级 PRO",

        // 徽章
        "Featured": "精选",
        "Popular": "热门",
        "Trending": "趋势",
        "Verified": "已验证",
        "Beta": "测试版",

        // 模型列表筛选
        "Text Generation": "文本生成",
        "Any-to-Any": "任意到任意",
        "Image-Text-to-Text": "图像-文本到文本",
        "Image-to-Text": "图像到文本",
        "Image-to-Image": "图像到图像",
        "Text-to-Image": "文本到图像",
        "Text-to-Video": "文本到视频",
        "Text-to-Speech": "文本到语音",
        "Image Classification": "图像分类",
        "Object Detection": "目标检测",
        "Segmentation": "分割",
        "Image Generation": "图像生成",
        "Video Generation": "视频生成",
        "Language Translation": "语言翻译",
        "Speech Synthesis": "语音合成",
        "3D Modeling": "3D建模",
        "Music Generation": "音乐生成",
        "Text Analysis": "文本分析",
        "Image Editing": "图像编辑",
        "Code Generation": "代码生成",
        "Question Answering": "问答",
        "Data Visualization": "数据可视化",
        "Voice Cloning": "语音克隆",
        "Background Removal": "背景移除",
        "Image Upscaling": "图像放大",
        "OCR": "文字识别",
        "Document Analysis": "文档分析",
        "Visual QA": "视觉问答",
        "Image Captioning": "图像描述",
        "Chatbots": "聊天机器人",
        "Sentiment Analysis": "情感分析",
        "Text Summarization": "文本摘要",
        "Medical Imaging": "医学影像",
        "Financial Analysis": "金融分析",
        "Game AI": "游戏AI",
        "Model Benchmarking": "模型基准测试",
        "Fine Tuning Tools": "微调工具",
        "Dataset Creation": "数据集创建",
        "Pose Estimation": "姿态估计",
        "Face Recognition": "人脸识别",
        "Anomaly Detection": "异常检测",
        "Recommendation Systems": "推荐系统",
        "Character Animation": "角色动画",
        "Style Transfer": "风格迁移",
        "Agent Environment": "智能体环境",
        "Spaces of the week": "本周精选空间",
        "All running apps": "所有运行中的应用",
        "Running": "运行中",
        "on": "于",
        "Zero": "Zero",
        "Natural Language Processing": "自然语言处理",
        "Audio": "音频",
        "Document": "文档",
        "Geospatial": "地理空间",
        "Image": "图像",
        "Modalities": "模态",
        "Type": "类型",
        "Benchmark": "基准测试",
        "Benchmark datasets": "基准测试数据集",
        "Traces": "轨迹",
        "Agent Traces": "智能体轨迹",
        "Text": "文本",
        "Time-series": "时间序列",
        "Video": "视频",
        "Multimodal": "多模态",
        "Tabular": "表格数据",
        "3D": "3D",
        "Reinforcement Learning": "强化学习",
        "Computer Vision": "计算机视觉",
        // B/k/M 数值保留原样

        // 更多 ML 任务
        "Image-Text-to-Image": "图像-文本到图像",
        "Image-Text-to-Video": "图像-文本到视频",
        "Visual Question Answering": "视觉问答",
        "Video-Text-to-Text": "视频-文本到文本",
        "Visual Document Retrieval": "视觉文档检索",
        "Depth Estimation": "深度估计",
        "Image Segmentation": "图像分割",
        "Image-to-Video": "图像到视频",
        "Unconditional Image Generation": "无条件图像生成",
        "Video Classification": "视频分类",
        "Zero-Shot Image Classification": "零样本图像分类",
        "Mask Generation": "掩码生成",
        "Zero-Shot Object Detection": "零样本目标检测",
        "Text-to-3D": "文本到3D",
        "Image-to-3D": "图像到3D",
        "Image Feature Extraction": "图像特征提取",
        "Text Classification": "文本分类",
        "Token Classification": "令牌分类",
        "Table Question Answering": "表格问答",
        "Zero-Shot Classification": "零样本分类",
        "Translation": "翻译",
        "Summarization": "摘要",
        "Feature Extraction": "特征提取",
        "Fill-Mask": "填充掩码",
        "Sentence Similarity": "句子相似度",
        "Table to Text": "表格到文本",
        "Multiple Choice": "多项选择",
        "Text Ranking": "文本排序",
        "Text Retrieval": "文本检索",
        "Text-to-Audio": "文本到音频",
        "Automatic Speech Recognition": "自动语音识别",
        "Audio-to-Audio": "音频到音频",
        "Audio Classification": "音频分类",
        "Voice Activity Detection": "语音活动检测",
        "Tabular Classification": "表格分类",
        "Tabular Regression": "表格回归",
        "Tabular to Text": "表格到文本",
        "Time Series Forecasting": "时间序列预测",
        "Robotics": "机器人学",
        "Graph Machine Learning": "图机器学习",

        // 筛选器与状态标签
        "Filter Libraries by name": "按名称筛选库",
        "Filter Tasks by name": "按名称筛选任务",
        "Filter Languages by name": "按名称筛选语言",
        "Filter Licenses by name": "按名称筛选许可证",
        "Filter Other by name": "按名称筛选其他",
        "Filter by name": "按名称筛选",
        "Filter by repository name": "按仓库名称筛选",
        "Filter by model name": "按模型名称筛选",
        "Filters": "筛选",
        "STATUS": "状态",
        "Running only": "仅运行中",
        "HARDWARE": "硬件",
        "OPTIONS": "选项",
        "Agents Ready": "智能体就绪",
        "MCP Compatible": "MCP 兼容",
        // 以下库名/工具名无需翻译，删除保留
        "Running on Zero": "运行于 Zero",
        "Agents": "智能体",
        "Static": "静态",

        // 定价页
        "Free": "免费",
        "Pro": "专业版",
        "Contact Us": "联系我们",
        "Get Started": "开始使用",

        // 博客页
        "Articles": "文章",
        "Announcements": "公告",
        "Tutorials": "教程",
        "Subscribe": "订阅",
        "Subscribe to our newsletter": "订阅我们的新闻通讯",

        // 每日论文
        "Today": "今日",
        "This Week": "本周",
        "This Month": "本月",
        "Vote": "投票",
        "Upvote": "赞同",
        "Discuss": "讨论",
        "Abstract": "摘要",
        "Authors": "作者",
        "Published": "发表时间",

        // 用户主页
        "Following": "关注",
        "Followers": "关注者",
        "Follow": "关注",
        "Follow your favorite AI creators": "关注你喜欢的 AI 创作者",
        "Refresh List": "刷新列表",
        "Solutions": "解决方案",
        "new": "新",
        "NEW": "最新",
        "latest": "最新",
        "NEWEST": "最新",

        // 动态 Feed
        "New Space": "新建空间",
        "The AI App Directory": "AI 应用目录",
        "Suggested": "推荐",
        "for you": "为你",
        "…read more": "…展开更多",
        "Discussion": "讨论",
        "- opened": "- 已打开",
        "Leave a comment": "发表评论",
        "Comment": "评论",
        "changed discussion status to": "将讨论状态更改为",
        "closed": "已关闭",
        "Unsubscribe": "取消订阅",
        "view post": "查看帖子",
        "Post": "发布",
        "Reply": "回复",
        "Load more": "加载更多",
        "Updated": "更新于",
        "updated": "更新于",
        "an": "一个",
        "a": "一个",
        "update": "动态",
        "updated a model": "更新了一个模型",
        "posted an update": "发布了动态",
        "posted": "发布了",
        "published": "发布了",
        "liked": "赞了",
        "published a model": "发布了一个模型",
        "published an update": "发布了更新",
        "published a Space": "发布了一个空间",
        "updated a Space": "更新了一个空间",
        "updated a dataset": "更新了一个数据集",
        "liked a Space": "赞了一个空间",
        "liked a dataset": "赞了一个数据集",
        "replied to their post": "回复了帖子",
        "view reply": "查看回复",
        "read more": "阅读更多",
        "Collection": "收藏集",
        "See the documentation": "查看文档",
        "Space updated": "空间已更新",
        "last 7 days": "过去 7 天",

        // 文档页
        "Search docs": "搜索文档",
        "Quick start": "快速开始",
        "API Reference": "API 参考",
        "Guides": "指南",

        // 文档首页
        "Guides, references, and API docs for the Hugging Face ecosystem.":
          "Hugging Face 生态系统的指南、参考和 API 文档",
        "Ask HuggingChat": "向 HuggingChat 提问",
        "Send message": "发送消息",
        "Hub & Client Libraries": "Hub 与客户端库",
        "Deployment & Inference": "部署与推理",
        "Core ML Libraries": "核心 ML 库",
        "Training & Optimization": "训练与优化",
        "Collaboration & Extras": "协作与扩展",
        "Host Git-based models, datasets, and Spaces on the HF Hub":
          "在 HF Hub 上托管基于 Git 的模型、数据集和应用空间",
        "Tools for agents and humans to interact with all the Hugging Face services":
          "供智能体和人类与所有 Hugging Face 服务交互的工具",
        "JavaScript libraries for Hugging Face with built-in TS types":
          "Hugging Face 的 JavaScript 库，内置 TypeScript 类型",
        "Explore demos, models, and datasets for any ML tasks":
          "探索任意 ML 任务的演示、模型和数据集",
        "API for metadata, stats, and content of HF Hub datasets":
          "HF Hub 数据集的元数据、统计和内容 API",
        "Call 200k+ models hosted by our 10+ Inference partners":
          "调用由 10+ 推理合作伙伴托管的 20 万+ 模型",
        "Deploy models on dedicated & fully managed infrastructure on HF":
          "在 HF 上部署模型到专用且完全托管的基础设施",
        "Train/deploy models from Hugging Face to AWS with DLCs":
          "使用 DLC 将模型从 Hugging Face 训练/部署到 AWS",
        "Serve embeddings models with TEI optimized toolkit":
          "使用 TEI 优化工具包服务嵌入模型",
        "Deploy Hugging Face models on Microsoft Azure":
          "在 Microsoft Azure 上部署 Hugging Face 模型",
        "Train and Deploy Hugging Face models on Google Cloud":
          "在 Google Cloud 上训练和部署 Hugging Face 模型",
        "Evaluate and compare models performance":
          "评估和比较模型性能",
        "Embeddings, Retrieval, and Reranking":
          "嵌入、检索和重排序",
        "Load and run compute kernels from the Hugging Face Hub":
          "从 Hugging Face Hub 加载和运行计算内核",
        "Optimize HF Transformers for faster training/inference":
          "优化 HF Transformers 以加快训练/推理",
        "Train/deploy Transformers/Diffusers on AWS":
          "在 AWS 上训练/部署 Transformers/Diffusers",
        "Train and Deploy models on Google TPUs via Optimum.":
          "通过 Optimum 在 Google TPU 上训练和部署模型",
        "Create and deploy agentic RL execution environments":
          "创建和部署智能体 RL 执行环境",
        "Optimize and quantize models with bitsandbytes":
          "使用 bitsandbytes 优化和量化模型",
        "All-in-one toolkit to evaluate LLMs across multiple backends":
          "在多个后端上评估 LLM 的一体化工具包",
        "Build ML demos and web apps with a few lines of Python":
          "用几行 Python 构建 ML 演示和 Web 应用",
        "A lightweight, local-first, and free experiment tracking Python library":
          "轻量级、本地优先、免费的实验跟踪 Python 库",
        "Making AI for Robotics more accessible with end-to-end learning":
          "通过端到端学习让机器人 AI 更易用",
        "Open-source expressive robot SDK for hackers and AI builders":
          "面向黑客和 AI 构建者的开源表情机器人 SDK",
        "AutoTrain API and UI for seamless model training":
          "用于无缝模型训练的 AutoTrain API 和 UI",
        "Open source chat frontend powering HuggingChat":
          "驱动 HuggingChat 的开源聊天前端",
        "Create custom Leaderboards on Hugging Face":
          "在 Hugging Face 上创建自定义排行榜",
        "Collaboration tool for building high-quality datasets":
          "构建高质量数据集的协作工具",
        "Framework for synthetic data generation and AI feedback":
          "合成数据生成和 AI 反馈框架",
        "Xet Protocol Specification": "Xet 协议规范",
        "State-of-the-art vision models: layers, optimizers, and utilities":
          "前沿视觉模型：层级、优化器和工具",
        "Deploying on AWS": "部署到 AWS",
        "Text Generation Inference": "文本生成推理",
        "Text Embeddings Inference": "文本嵌入推理",
        "AWS Trainium & Inferentia": "AWS Trainium & Inferentia",
        "Google TPUs": "Google TPU",
        "Dataset viewer": "数据集查看器",
        "Inference Endpoints (dedicated)": "推理端点（专用）",

        // 企业版页面
        "Scale your organization with the world’s leading AI platform":
          "用世界领先的 AI 平台扩展你的组织",
        "Subscribe to Team": "订阅团队版",
        "starting at $20/user/month": "每位用户每月 $20 起",
        "Contact sales for Enterprise": "联系销售获取企业版",
        "to explore flexible contract options": "探索灵活的合约选项",
        "Give your organization the most advanced platform to build AI with":
          "为你的组织提供最先进的 AI 构建平台，具备",
        "enterprise-grade security, access controls, dedicated support":
          "企业级安全、访问控制、专属支持",
        "and more.": "等",
        "Connect securely to your identity provider with SSO integration.":
          "通过 SSO 集成安全连接到你的身份提供商",
        "Select, manage, and audit the location of your repository data.":
          "选择、管理和审计你的仓库数据位置",
        "Stay in control with comprehensive logs that report on actions taken.":
          "通过全面的操作日志保持控制",
        "Accurately manage access to repositories with granular access control.":
          "通过细粒度访问控制精确管理仓库访问权限",
        "Token Management": "令牌管理",
        "Centralized token control and custom approval policies for organization access.":
          "集中令牌控制和自定义审批策略",
        "Analytics": "分析",
        "Track and analyze repository usage data in a single dashboard.":
          "在单一仪表盘中跟踪和分析仓库使用数据",
        "Advanced Compute Options": "高级计算选项",
        "Increase scalability and performance with more compute options like ZeroGPU.":
          "通过 ZeroGPU 等更多计算选项提高可扩展性和性能",
        "ZeroGPU Quota Boost": "ZeroGPU 配额提升",
        "All organization members get 8x more ZeroGPU quota to get the most of Spaces.":
          "所有组织成员获得 8 倍 ZeroGPU 配额，充分利用应用空间",
        "Enable the Dataset Viewer on your private datasets for easier collaboration.":
          "在私有数据集上启用数据集查看器，便于协作",
        "Private Storage": "私有存储",
        "Get an additional 1 TB of private storage for each member of your organization (then $18/month per extra TB).":
          "为组织每个成员额外获得 1 TB 私有存储（之后每额外 TB $18/月）",
        "Enable organization billing for Inference Providers, monitor usage with analytics, and manage spending limits.":
          "为推理供应商启用组织账单、分析使用情况并管理消费限额",
        "Advanced security": "高级安全",
        "Configure organization-wide security policies and default repository visibility.":
          "配置组织级安全策略和默认仓库可见性",
        "Control your budget effectively with managed billing and yearly commit options.":
          "通过托管账单和年度承诺选项有效控制预算",
        "Maximize your platform usage with priority support from the Hugging Face team.":
          "通过 Hugging Face 团队的优先支持最大化平台使用",
"Everything you already know and love about Hugging Face in Enterprise mode.":
          "你所熟悉和喜爱的 Hugging Face，现在以企业模式呈现",
        "Subscribe to": "订阅",
        "Contact sales for": "联系销售获取",
        "or": "或",

        // 定价页
        "Leveling up AI collaboration and compute.": "提升 AI 协作与计算水平",
        "Give your personal account or your organization the most advanced platform to build AI.":
          "为你的个人账户或组织提供最先进的 AI 构建平台",
        "PRO Account": "PRO 账户",
        "Boost your personal HF experience": "提升你的个人 HF 体验",
        "/month": "/月",
        "/month per user": "/月/每用户",
        "/TB/mo": "/TB/月",
        "Most popular": "最受欢迎",
        "Instant setup for growing teams": "为成长型团队即时配置",
        "Custom onboarding and enterprise features": "定制接入和企业功能",
        "Get Team (via credit card)": "获取团队版（通过信用卡）",
        "Talk to sales": "联系销售",
        "10× private storage capacity": "10 倍私有存储容量",
        "2× public storage capacity": "2 倍公共存储容量",
        "20× included inference credits": "20 倍推理积分",
        "8× ZeroGPU quota and highest queue priority": "8 倍 ZeroGPU 配额和最高队列优先级",
        "Spaces Dev Mode & ZeroGPU Spaces hosting": "应用空间开发模式和 ZeroGPU 托管",
        "Personal blog publishing": "个人博客发布",
        "Dataset Viewer for private datasets": "私有数据集查看器",
        "Show your support with a PRO badge": "用 PRO 徽章展示你的支持",
        "All benefits from the Team plan": "团队版所有权益",
        "SSO support (SAML & OIDC)": "SSO 支持（SAML 和 OIDC）",
        "Data location control with Storage Regions": "通过存储区域控制数据位置",
        "Detailed action reviews with Audit Logs": "通过审计日志进行详细操作审查",
        "Granular access control via Resource Groups": "通过资源组进行细粒度访问控制",
        "Repository usage Analytics": "仓库使用分析",
        "Advanced auth policies and repository visibility controls":
          "高级认证策略和仓库可见性控制",
        "Centralized token control and approvals": "集中令牌控制和审批",
        "Advanced compute options for Spaces": "应用空间高级计算选项",
        "All organization members get ZeroGPU and Inference Providers PRO benefits":
          "所有组织成员获得 ZeroGPU 和推理供应商 PRO 权益",
        "Highest storage, bandwidth, and API rate limits": "最高存储、带宽和 API 速率限制",
        "Automated user management with SCIM provisioning":
          "通过 SCIM 配置自动管理用户",
        "Advanced security and access controls": "高级安全和访问控制",
        "Managed billing with annual commitments": "年度承诺托管账单",
        "Legal and Compliance processes": "法律与合规流程",
        "Dedicated support": "专属支持",
        "Need support to adopt the HF Hub in your organization?":
          "需要在组织中采用 HF Hub 的支持？",
        "Name": "名称",
        "Hourly price": "每小时价格",
        "Building something cool as a side project? We also offer community GPU grants.":
          "在搞副项目？我们还提供社区 GPU 资助",

        // 右上角用户菜单
        "New Model": "新建模型",
        "New Dataset": "新建数据集",
        "New Bucket": "新建存储桶",
        "New Collection": "新建收藏集",
        "Empty collection": "空收藏集",
        "Welcome to the community": "欢迎来到社区",
        "The community tab is the place to discuss and collaborate with the HF community!": "社区标签是与 HF 社区讨论和协作的地方！",
        "To add items to this collection, use": "要将项目添加到此收藏集，请使用",
        "or the context menu on models, datasets, Spaces, papers or buckets pages.":
          "或在模型、数据集、应用空间、论文或存储桶页面上使用右键菜单",
        "+ Add to collection": "+ 添加到收藏集",
        "Create organization": "创建组织",
        "Organizations Settings": "组织设置",
        "New Organization": "新建组织",
        "Complete your organization profile": "完善你的组织资料",
        "Organization Username": "组织用户名",
        "Organization type": "组织类型",
        "University": "大学",
        "Classroom": "班级",
        "Non-profit": "非营利",
        "Government": "政府",
        "Organization Full name": "组织全名",
        "Logo (optional)": "标志（可选）",
        "Upload a file": "上传文件",
        "GitHub alias": "GitHub 别名",
        "Create Organization": "创建组织",
        "Inference Providers Overview": "推理供应商概览",
        "Compare models across all providers": "比较所有供应商的模型",
        "Set your API keys for third party Inference Providers.":
          "为第三方推理供应商设置你的 API 密钥",
        "To enable or disable an Inference Provider and show it on model pages.":
          "启用或禁用推理供应商并显示在模型页面上",
        "Providers routing mode": "供应商路由模式",
        "Routing mode": "路由模式",
        "Spending limit": "消费限额",
        "Last Used": "最后使用",
        "View Models": "查看模型",
        "billing disabled": "账单已禁用",
        "This provider does not provide an accurate pricing for inference requests yet. Usage is disabled beyond your included credits.":
          "此供应商尚未提供准确的推理请求定价。超出包含的 Credits 后将禁用使用",
        "with Inference Providers": "与推理供应商",
        "API calls": "API 调用次数",
        "Drag and drop your providers to set priority. The model page widget will automatically use the first compatible provider by default.":
          "拖放供应商以设置优先级。模型页面组件将默认自动使用第一个兼容的供应商",
        "No limit set": "未设置限制",
        "If a custom key is set, it will be used directly for inference requests.":
          "如果设置了自定义密钥，将直接用于推理请求",
        "Monthly spending limit for Inference Providers. Requests that exceed this limit will fail and result in an error. Does not apply to providers with a custom key.":
          "推理供应商的月度消费限额。超出此限制的请求将失败并返回错误。不适用于设置了自定义密钥的供应商",
        "If a custom key is set, it will be used on the HF website and widgets when calling that specific provider's API. If not, requests will be routed through our infrastructure and billed to your HF account (requires a registered credit card and respects your maximum spend limit).":
          "如果设置了自定义密钥，在调用该供应商的 API 时将在 HF 网站和组件中使用。否则，请求将路由到我们的基础设施并计入你的 HF 账户（需要注册信用卡，并遵循你的最高消费限制）",
        "to instantly get 20x more included monthly credits!":
          "立即获取 20 倍月度包含 Credits！",
        "Subscribe to repos or discussions updates.": "订阅仓库或讨论更新",
        "Use Webhooks to subscribe to repo updates and/or discussion events on any model, dataset or Space (not just the ones you own). A Webhook will send a payload to the given URL or start a job when an event is triggered.":
          "使用 Webhook 订阅任何模型、数据集或应用空间（不仅限于你拥有的）的仓库更新和/或讨论事件。当事件触发时，Webhook 将向指定 URL 发送负载或启动作业",
        "New Webhook": "新建 Webhook",
        "For example you can auto-convert models, build community bots, or CI/CD for your datasets or Spaces.":
          "例如，你可以自动转换模型、构建社区机器人，或为数据集或应用空间设置 CI/CD",
        "New webhook": "新建 Webhook",
        "Create webhook": "创建 Webhook",
        "Target repositories": "目标仓库",
        "Any repository on the hub you want to listen to new events, can be any model, dataset or Space. You can also subscribe to a whole user or org namespace.":
          "Hub 上你想监听新事件的任意仓库，可以是模型、数据集或应用空间。你也可以订阅整个用户或组织命名空间",
        "Webhook type": "Webhook 类型",
        "Choose if you want to send events to a webhook URL or to trigger a Job.":
          "选择是要将事件发送到 Webhook URL 还是触发 Job",
        "Webhook URL": "Webhook URL",
        "The payload will be sent as JSON in a POST request.":
          "负载将以 JSON 格式通过 POST 请求发送",
        "Secret": "密钥",
        "The secret will be sent in the X-Webhook-Secret header. Use ASCII characters.":
          "密钥将通过 X-Webhook-Secret 头发送。请使用 ASCII 字符",
        "Triggers": "触发器",
        "Choose which events will trigger the webhook.":
          "选择哪些事件将触发 Webhook",
        "Repo update": "仓库更新",
        "Community (PR & discussions)": "社区（PR 和讨论）",
        "Job": "作业",
        "Read more about webhooks payloads": "详细了解 Webhook 负载",
        "arXiv identifier": "arXiv 标识符",
        "Claim authorship": "认领作者身份",
        "Claim paper authorship": "认领论文作者身份",
        "Author of a paper? You can claim authorship of your papers to showcase them directly on your HF profile. It will be matched against your email address; it is possible to":
          "论文作者？你可以认领论文作者身份，直接在你的 HF 个人主页上展示。将通过你的邮箱地址进行匹配；你可以",
        "add secondary emails": "添加次要邮箱",
        "in your preferences if your paper is linked to another email on arXiv.":
          "如果你的论文在 arXiv 上关联了其他邮箱，请在偏好设置中操作",
        "Gated Repos Status": "受限仓库状态",
        "View the gated repositories that you have requested access to.":
          "查看你已经请求访问的受限仓库",
        "Repo Name": "仓库名称",
        "Date": "日期",
        "Request Status": "请求状态",
        "accepted": "已接受",
        "pending": "待处理",
        "Gating Group Collection": "门控组收藏集",
        "Content Preferences": "内容偏好",
        "Not-For-All-Audiences": "非全年龄内容",
        "Choose whether to show or hide content labeled \"Not-For-All-Audiences\" by default.":
          "选择默认显示还是隐藏标记为「非全年龄」的内容",
        "Hide Not-For-All-Audiences content": "隐藏非全年龄内容",
        "Not-For-All-Audiences content is currently": "非全年龄内容当前：",
        "by default.": "（默认）",
        "shown": "显示",
        "hidden": "已隐藏",
        "Connected Applications": "已关联的应用",
        "External Apps": "外部应用",
        "Revoke": "撤销",
        "Developer Applications": "开发者应用",
        "Set your favorite local applications, to show them by default on all compatible model pages.":
          "设置你偏好的本地应用，以便在所有兼容的模型页面上默认显示",
        "Browse": "浏览",
        "Set your preferred local inference apps": "设置你偏好的本地推理应用",
        "Give feedback": "提供反馈",
        "suggest a new Local App": "建议新的本地应用",
        "'s activity": "的动态",
        "applications": "个应用",
        "Authorized": "已授权",
        "Connected applications have partial access to your account or organizations depending on what you grant them":
          "已关联的应用根据你的授权，对你的账户或组织拥有部分访问权限",
        "Create App": "创建应用",
        "No connected": "无关联",
        "Public profile": "公开资料",
        "Add \"Sign in with HF\" to your own applications.":
          "将「Sign in with HF」添加到你的应用中",
        "Want to add HF login to your Spaces?": "想为你的应用空间添加 HF 登录？",
        "Want to develop an HF app?": "想开发 HF 应用？",
        "Enable 2FA by scanning the following QR code with your authenticator app or browser extension.":
          "通过扫描以下二维码使用你的验证器应用或浏览器扩展启用双重认证",
        "6-digit code from the app": "来自应用 6 位验证码",
        "View usage": "查看用量",
        "View doc": "查看文档",
        "Automatic Recharge": "自动充值",
        "Set up Automatic Recharge": "设置自动充值",
        "Add Credits to your balance": "向你的余额添加 Credits",
        "Set automatic recharge": "设置自动充值",
        "When credits balance goes below": "当 Credits 余额低于",
        "(minimum $5)": "（最低 $5）",
        "If your balance is below your threshold, you'll be charged right away.":
          "如果余额低于阈值，将立即扣费",
        "Recharge credit balance to": "充值 Credits 余额至",
        "(minimum $15)": "（最低 $15）",
        "Save Settings": "保存设置",
        "Automatic Recharge reloads Credits on your balance when they fall below a certain threshold.":
          "自动充值在余额低于阈值时重新加载 Credits",
        "It is also required to keep uploading once you exceed your private storage capacity (overages are billed per TB to your payment method).":
          "超出私有存储容量后，若要继续上传也需要自动充值（超额部分按 TB 计费到你的付款方式）",
        "to enable Automatic Recharge.": "以启用自动充值",
        "Available Credits. Can be used to pay compute service usage on Hugging Face":
          "可用 Credits。用于支付 Hugging Face 上的计算服务使用费",
        "Current period usage": "当前周期用量",
        "Ends on": "结束于",
        "Compute Usage": "计算用量",
        "ZeroGPU Usage": "ZeroGPU 用量",
        "Bill inference usage to your organization": "将推理用量计入组织账单",
        "Hub Rate Limits": "Hub 速率限制",
        "Hub APIs": "Hub API",
        "Resolvers": "解析器",
        "Rate limits are applied over": "速率限制适用于",
        "intervals.": "间隔",
        "minutes": "分钟",
        "Pages": "页面",
        "Visibility": "可见性",
        "% of Total": "占总比",
        "Used storage:": "已用存储：",
        "The number of requests to the Hub API Endpoints in the last 5-minute interval. Upgrade to increase your rate limit.":
          "过去 5 分钟内向 Hub API 端点的请求数。升级以提高速率限制",
        "The number of requests to the Resolvers (i.e. URLs that contains /resolve/) in the last 5-minute interval. Upgrade to increase your rate limit.":
          "过去 5 分钟内向解析器（包含 /resolve/ 的 URL）的请求数。升级以提高速率限制",
        "The number of requests to the web pages hosted on huggingface.co in the last 5-minute interval. Upgrade to increase your rate limit.":
          "过去 5 分钟内对 huggingface.co 网页的请求数。升级以提高速率限制",
        "to get up to ~10x more storage, compute and Hub rate limits.":
          "以获取高达 10 倍的存储、计算和 Hub 速率限制",
        "Up to 5 min of ZeroGPU usage per day. Subscribe to PRO to get 40 minutes of included usage.":
          "每天最多 5 分钟 ZeroGPU 使用。订阅 PRO 可获得 40 分钟包含使用量",
        "You have consumed": "已使用",
        "out of your": "，你的",
        "included credits.": "包含的 Credits",
        "You are not a member of any organization.": "你还不是任何组织的成员",
        "Request pending": "请求待处理",
        "Your request is under review.": "你的请求正在审核中",
        "min": "分钟",
        "5-minute": "5 分钟",
        "run any workload on GPUs": "在 GPU 上运行任意工作负载",
        "Spaces Hosting": "应用空间托管",
        "Subscribe Now": "立即订阅",
        "for": "每月",
        "Get 10× private storage capacity (up to 1TB)": "获取 10 倍私有存储容量（最高 1TB）",
        "Get 2× public storage capacity (up to 10TB)": "获取 2 倍公共存储容量（最高 10TB）",
        "Get 20× included credits across all inference providers":
          "在所有推理供应商中获取 20 倍包含的 Credits",
        "Get 8× daily usage quota with the highest priority in queues":
          "获取 8 倍日常使用配额和最高队列优先级",
        "Host ZeroGPU Spaces running on distributed RTX Pro 6000 Blackwell hardware":
          "托管在分布式 RTX Pro 6000 Blackwell 硬件上运行的 ZeroGPU 应用空间",
        "Faster iteration cycles with SSH/VS Code support for Spaces":
          "通过 SSH/VS Code 支持加速应用空间迭代周期",
        "Activate and use it on private datasets": "在私有数据集上激活和使用",
        "Write and publish blog articles on your HF profile":
          "在你的 HF 个人主页编写和发布博客文章",
        "Get exclusive early access to upcoming features": "提前体验即将推出的功能",
        "Show your support on your profile": "在你的个人主页展示你的支持",
        "Month": "月份",
        "Status": "状态",
        "Amount": "金额",
        "upcoming": "即将到来",
        "paid": "已支付",
        "call 250k+ models via API": "通过 API 调用 25 万+ 模型",
        "dedicated deployments": "专用部署",
        "host on custom hardware": "在自定义硬件上托管",
        ": Get 10× private storage capacity (up to 1TB)":
          "：获取 10 倍私有存储容量（最高 1TB）",
        ": Get 2× public storage capacity (up to 10TB)":
          "：获取 2 倍公共存储容量（最高 10TB）",
        ": Get 20× included credits across all inference providers":
          "：在所有推理供应商中获取 20 倍包含的 Credits",
        ": Get 8× daily usage quota with the highest priority in queues":
          "：获取 8 倍日常使用配额和最高队列优先级",
        ": Host ZeroGPU Spaces running on distributed RTX Pro 6000 Blackwell hardware":
          "：托管在分布式 RTX Pro 6000 Blackwell 硬件上运行的 ZeroGPU 应用空间",
        ": Faster iteration cycles with SSH/VS Code support for Spaces":
          "：通过 SSH/VS Code 支持加速应用空间迭代周期",
        ": Activate and use it on private datasets":
          "：在私有数据集上激活和使用",
        ": Write and publish blog articles on your HF profile":
          "：在你的 HF 个人主页编写和发布博客文章",
        ": Get exclusive early access to upcoming features":
          "：提前体验即将推出的功能",
        ": Show your support on your profile":
          "：在你的个人主页展示你的支持",
        "Spaces Dev Mode": "应用空间开发模式",
        "Dataset Viewer": "数据集查看器",
        "Viewer": "查看器",
        "Features Preview": "功能预览",
        "PRO Badge": "PRO 徽章",
        "extra quota beyond daily allowance": "日常配额之外的额外配额",
        "extra storage for private repos": "私有仓库的额外存储",
        "Run compute jobs on Hugging Face infrastructure with a familiar Docker-like interface!":
          "在 Hugging Face 基础设施上使用熟悉的类 Docker 界面运行计算作业",
        "Why Hugging Face Jobs?": "为什么选择 Hugging Face Jobs？",
        "CPUs to A100s & TPUs": "从 CPU 到 A100 和 TPU",
        "Docker, HF Spaces & more": "Docker、HF Spaces 等",
        "Pay only for seconds used": "按秒计费",
        "Quick Start Examples": "快速入门示例",
        "Install the Hugging Face CLI:": "安装 Hugging Face CLI：",
        "1. Install the Hugging Face CLI:": "1. 安装 Hugging Face CLI：",
        "Install the CLI": "安装 CLI",
        "Install the CLI (using uv)": "安装 CLI（使用 uv）",
        "Login to your Hugging Face account:": "登录你的 Hugging Face 账户：",
        "2. Login to your Hugging Face account:": "2. 登录你的 Hugging Face 账户：",
        "New Job": "新建作业",
        "Any Hardware": "任意硬件",
        "Docker-like CLI": "类 Docker CLI",
        "Run Anything": "运行任意任务",
        "Pay-as-you-go": "按需付费",
        "Learn more about Hugging Face Jobs by reading the": "通过阅读以下内容了解更多关于 Hugging Face Jobs 的信息",
        "documentation": "文档",
        "command:": "命令：",
        "3. Create a job using the": "3. 使用以下命令创建作业",
        "to start your own Jobs.": "开始使用你的 Jobs",
        "HF CLI Skill": "HF CLI 技能",
        "Run Python code directly": "直接运行 Python 代码",
        "Run a local script with uv": "使用 uv 运行本地脚本",
        "Use GPUs without any setup": "无需配置即可使用 GPU",
        "Run a Docker image": "运行 Docker 镜像",
        "Run Python code on a cron schedule": "按 cron 调度运行 Python 代码",
        "Model": "模型",
        "Requests": "请求数",
        "Cost": "成本",
        "Models breakdown": "模型细分",
        "Last Request": "最后请求",
        "Number of requests": "请求数量",
        "Accrued cost": "累计成本",
        "Webhooks": "Webhook",
        "Papers Settings": "论文设置",
        "Jobs Settings": "作业设置",
        "Local Apps Settings": "本地应用设置",
        "Gated Repositories": "受限仓库",
        "Connected Apps Settings": "已关联的应用设置",
        "Theme": "主题",
        "Usage Quota": "使用额度",
        "Public Storage": "公共存储",
        "Zero GPU": "ZeroGPU",
        "Inference Usage": "推理用量",
        "Access Tokens": "访问令牌",
        "Get Hugging Face PRO": "获取 Hugging Face PRO",

        // 设置页侧栏
        "Authentication": "身份认证",
        "Repositories": "仓库",
        "SSH and GPG Keys": "SSH 和 GPG 密钥",
        "Jobs": "职位",
        "Local Apps": "本地应用",
        "MCP": "MCP",
        "Upgrade to": "升级到",

        // 个人设置页
        "Profile Settings": "个人设置",
        "Full name": "全名",
        "Avatar (optional)": "头像（可选）",
        "Homepage (optional)": "主页（可选）",
        "AI & ML interests (optional)": "AI 与 ML 兴趣（可选）",
        "GitHub username (optional)": "GitHub 用户名（可选）",
        "Twitter username (optional)": "Twitter 用户名（可选）",
        "LinkedIn profile (optional)": "LinkedIn 个人资料（可选）",
        "Bluesky username (optional)": "Bluesky 用户名（可选）",
        "Homepage": "主页",
        "GitHub username": "GitHub 用户名",
        "Twitter account": "Twitter 账户",
        "LinkedIn profile": "LinkedIn 个人资料",
        "Bluesky account": "Bluesky 账户",
        "Remove": "删除",
        "(optional)": "（可选）",
        "Twitter username": "Twitter 用户名",
        "Bluesky username": "Bluesky 用户名",
        "Save changes": "保存更改",
        "Upload file": "上传文件",

        // 账户设置页
        "Account Settings": "账户设置",
        "Username": "用户名",
        "Enter new password": "输入新密码",
        "Confirm your new password": "确认新密码",
        "Confirm new password": "确认新密码",
        "Your primary email is used to communicate with you and to authenticate on hf.co. Additional emails help you join organizations and identify git commits you make.":
          "你的主邮箱用于与你沟通和在 hf.co 上验证身份。额外的邮箱帮助你加入组织和标识 Git 提交",
        "primary": "主邮箱",
        "verified": "已验证",
        "Add an email": "添加邮箱",
        "Kernel Publishing": "内核发布",
        "Request access to start publishing": "请求访问权限以开始发布",
        "kernel repositories": "内核仓库",
        "We recommend requesting access from your organization's settings for better visibility and trust.":
          "建议从组织设置中请求访问权限，以获得更好的可见性和信任度",
        "Request access": "请求访问",
        "Delete your account": "删除账户",
        "Delete your HF account permanently, this action is irreversible. All your repositories (models, datasets, & Spaces) will be deleted.":
          "永久删除你的 HF 账户，此操作不可逆。所有仓库（模型、数据集和应用空间）将被删除",
        "Delete my account": "删除我的账户",
        "Delete your Hugging Face account": "删除你的 Hugging Face 账户",
        "Deleting your account will delete all your repositories (models, datasets, and Spaces). Your username will be instantly available for new users. You will be immediately billed for any usage of paid services for the current month. In case of an active subscription, you will be billed for the entirety of the remaining period.":
          "删除账户将删除所有仓库（模型、数据集和应用空间）。你的用户名将立即可供新用户使用。你将立即被收取当月付费服务费用。如有活跃订阅，剩余期间的全部费用将被收取",
        "Link another email to your account": "将另一个邮箱关联到你的账户",
        "Email": "邮箱",

        // 身份认证设置页
        "Authentication Settings": "身份认证设置",
        "Two-Factor Authentication": "双重认证",
        "Add an extra identity check at sign-in. Use a trusted app or extension such as Google Authenticator, 1Password, Authy, or Microsoft Authenticator to create your single-use passwords.":
          "在登录时增加额外的身份验证。使用受信任的应用或扩展（如 Google Authenticator、1Password、Authy 或 Microsoft Authenticator）创建一次性密码",
        "Add Two-Factor Authentication": "添加双重认证",
        "CI/CD Access": "CI/CD 访问",
        "Allow CI/CD workflows (GitHub Actions, GitLab CI, etc.) to read gated repos and use your account's rate limits — without storing long-lived tokens as CI secrets. Workflows receive short-lived tokens scoped to your account; they can't write to repos or read your private repos.":
          "允许 CI/CD 工作流（GitHub Actions、GitLab CI 等）读取受限仓库和使用账户速率限制——无需将长期令牌存储为 CI 机密。工作流接收限定你账户范围的短期令牌，无法写入仓库或读取私有仓库",
        "These tokens are read-only. To push to a repo from CI/CD, configure a trusted publisher in that repo's settings instead.":
          "这些令牌是只读的。若要从 CI/CD 推送到仓库，请改为在该仓库的设置中配置受信任的发布者",
        "No CI/CD identities configured": "未配置 CI/CD 身份",
        "Add CI/CD identity": "添加 CI/CD 身份",

        // 账单设置页
        "Payment information": "付款信息",
        "Subscriptions": "订阅",
        "Invoices": "发票",
        "Current period": "当前周期",
        "No usage": "无使用量",
        "No storage used": "未使用存储",
        
        "Getting started with HF Credits": "HF Credits 快速入门",
        "Credits let you use HF pay-as-you-go services:": "Credits 让你使用 HF 按需付费服务：",
        "Jobs: run any workload on GPUs": "Jobs：在 GPU 上运行任意工作负载",
        "Inference Providers: call 250k+ models via API": "推理供应商：通过 API 调用 25 万+ 模型",
        "Inference Endpoints: dedicated deployments": "推理端点：专用部署",
        "GPU Spaces: host on custom hardware": "GPU Spaces：在自定义硬件上托管",
        "ZeroGPU: extra quota beyond daily allowance": "ZeroGPU：日常配额之外的额外配额",
        "Private Storage: extra storage for private repos": "私有存储：私有仓库的额外存储",
        "Add": "添加",
        "Add Credits": "添加 Credits",

        // 访问令牌列表页
        "User Access Tokens": "用户访问令牌",
        "Create new token": "创建新令牌",
        "Access tokens authenticate your identity to the Hugging Face Hub and allow applications to perform actions based on token permissions.":
          "访问令牌向 Hugging Face Hub 验证你的身份，并允许应用根据令牌权限执行操作",
        "Do not share your": "不要与任何人分享你的",
        "with anyone": "与任何人",
        "; we regularly check for leaked Access Tokens and remove them immediately.":
          "；我们会定期检查泄露的访问令牌并立即移除",
        "Last Refreshed Date": "最后刷新日期",
        "Last Used Date": "最后使用日期",
        "Permissions": "权限",
        "Value": "值",
        "FINEGRAINED": "细粒度",
        "Create new Access Token": "创建新访问令牌",
        "Return": "返回",
        "Token type": "令牌类型",
        "Fine-grained": "细粒度",
        "Read": "读取",
        "Write": "写入",
        "This cannot be changed after token creation.": "创建后无法更改",
        "Token name": "令牌名称",
        "User permissions": "用户权限",
        "Discussions & Posts": "讨论与帖子",
        "Repositories permissions": "仓库权限",
        "Override any user-level or org-level permissions set below for the specified repositories. The token will always have read access to all public repos contents.":
          "覆盖下方为用户或组织级别指定的仓库权限。令牌始终对所有公共仓库内容具有读取权限",
        "Search for repos": "搜索仓库",
        "Org permissions": "组织权限",
        "None if not specified.": "未指定则无",
        "Search for orgs": "搜索组织",
        "Org settings": "组织设置",
        "Create token": "创建令牌",

        // 创建令牌页（权限选项）
        "User permissions (cyberlangke)": "用户权限（cyberlangke）",
        "Read access to contents of all repos under your personal namespace":
          "读取个人命名空间下所有仓库的内容",
        "View access requests for all gated repos under your personal namespace":
          "查看个人命名空间下所有受限仓库的访问请求",
        "Read access to contents of all public gated repos you can access":
          "读取你可访问的所有公开受限仓库的内容",
        "Write access to contents/settings of all repos under your personal namespace":
          "写入个人命名空间下所有仓库的内容/设置",
        "Make calls to Inference Providers": "调用推理供应商",
        "Make calls to your Inference Endpoints": "调用你的推理端点",
        "Manage your Inference Endpoints": "管理你的推理端点",
        "Access webhooks data": "访问 Webhook 数据",
        "Create and manage webhooks": "创建和管理 Webhook",
        "Read access to all collections under your personal namespace":
          "读取个人命名空间下所有收藏集",
        "Write access to all collections under your personal namespace":
          "写入个人命名空间下所有收藏集",
        "Interact with discussions / Open PRs on repos under your personal namespace":
          "参与个人命名空间下仓库的讨论/开启 PR",
        "Interact with discussions / Open PRs on external repos":
          "参与外部仓库的讨论/开启 PR",
        "Interact with posts": "参与帖子互动",
        "Read access to your billing usage and know if a payment method is set":
          "读取账单使用情况和付款方式设置状态",
        "Start and manage Jobs on your behalf": "代表你启动作业",
        "Read access to your notification inbox": "读取通知收件箱",
        "Manage your notification inbox (delete, mark as read)":
          "管理通知收件箱（删除、标为已读）",
        "Read access to contents of selected repos": "读取选定仓库的内容",
        "View access requests for selected gated repos": "查看选定受限仓库的访问请求",
        "Interact with discussions / Open pull requests on selected repos":
          "参与选定仓库的讨论/开启 PR",
        "Write access to contents/settings of selected repos":
          "写入选定仓库的内容/设置",
        "Read access to contents of all repos in selected organizations":
          "读取选定组织中所有仓库的内容",
        "View access requests for gated repos in selected organizations":
          "查看选定组织中受限仓库的访问请求",
        "Interact with discussions / Open pull requests on repos in selected organizations":
          "参与选定组织中仓库的讨论/开启 PR",
        "Write access to contents/settings of all repos in selected organizations":
          "写入选定组织中所有仓库的内容/设置",
        "Make calls to Inference Providers on behalf of the selected organizations":
          "代表选定组织调用推理供应商",
        "Make calls to the organization's Inference Endpoints":
          "调用组织的推理端点",
        "Manage the organization's Inference Endpoints":
          "管理组织的推理端点",
        "Read access to organizations settings": "读取组织设置",
        "Write access to organizations settings / member management":
          "写入组织设置/成员管理",
        "Read access to all collections in selected organizations":
          "读取选定组织中的所有收藏集",
        "Write access to all collections in selected organizations":
          "写入选定组织中的所有收藏集",
        "Write access to resource groups in selected organizations":
          "写入选定组织中的资源组",
        "This token has read-only access to all your and your orgs resources and can make calls to Inference Providers on your behalf. It can also be used to open pull requests and comment on discussions.":
          "此令牌对你和组织所有资源具有只读访问权限，并可代表你调用推理供应商。还可用于开启 PR 和参与讨论",
        "This token has read and write access to all your and your orgs resources and can make calls to Inference Providers on your behalf.":
          "此令牌对你和组织所有资源具有读写访问权限，并可代表你调用推理供应商",
        "Start and manage Jobs in selected organizations.":
          "在选定组织中启动作业",

        // SSH 密钥页
        "SSH & GPG Keys": "SSH 和 GPG 密钥",
        "SSH Key": "SSH 密钥",
        "Add SSH Key": "添加 SSH 密钥",
        "Add GPG Key": "添加 GPG 密钥",
        "Add a SSH key": "添加 SSH 密钥",
        "Add a PGP key": "添加 PGP 密钥",
        "Add key": "添加密钥",
        "Key name": "密钥名称",
        "SSH Public key": "SSH 公钥",
        "PGP Public key": "PGP 公钥",
        "Learn how to generate a SSH key": "了解如何生成 SSH 密钥",
        "here": "这里",
        "No GPG key added to your account yet": "你的账户尚未添加 GPG 密钥",
        
        // 通知设置页
        "Notification Settings": "通知设置",
        "Community Notifications": "社区通知",
        "Web": "网页",
        "Choose on which organizations/users to get notified on new discussions and PRs or posts":
          "选择在哪些组织/用户的新的讨论、PR 或帖子时接收通知",
        "Other notifications (email only)": "其他通知（仅邮箱）",
        "New features and announcements": "新功能和公告",
        "Repo Discussions": "仓库讨论",
        "Posts, Articles, & Papers Replies": "帖子、文章和论文回复",
        "New activity on watched orgs/users": "关注的 org/用户有新活动",
        "Watch settings": "关注设置",
        "repositories": "仓库",
        "you": "你",
        "Repo Discussions you're participating in or mentioned in":
          "你参与或被提及的仓库讨论",
        "Posts, Articles, & Papers Replies you're participating in or mentioned in":
          "你参与或被提及的帖子、文章和论文回复",
        "Repo Discussions & Posts from users & orgs you're watching":
          "你关注的用户和 org 的仓库讨论和帖子",
        "Add any organization/user": "添加任意组织/用户",
        "Requests to join your organization(s)": "加入组织的请求",
        "Suggestions for organizations to join": "建议加入的组织",
        "Another HF user follows you": "有 HF 用户关注你",
        "ArXiv papers authorship detection and claim activity":
          "ArXiv 论文作者身份检测和认领活动",
        "Requests to access your gated repositories": "访问受限仓库的请求",
        "Secret(s) detected in the code of one of your repos":
          "在你的仓库代码中检测到机密",
        "Inference Endpoint status changes (e.g. when an endpoint goes down)":
          "推理端点状态变更（如端点宕机）",
        "Billing notifications": "账单通知",

        // 仓库设置页
        "Repository Settings": "仓库设置",
        "Default repository visibility": "默认仓库可见性",

        // 主题设置页
        "Theme Settings": "主题设置",

        // MCP Server 设置页
        "MCP Server": "MCP 服务器",
        "Setup with your AI assistant": "设置你的 AI 助手",
        "Connect your AI assistant to the Hugging Face ecosystem.":
          "将你的 AI 助手连接到 Hugging Face 生态系统",
        "Connect your MCP client and configure which tools are available in your Hugging Face Hub MCP server.":
          "连接你的 MCP 客户端，配置 Hugging Face Hub MCP 服务器中可用的工具",
        "Enable in your HuggingChat MCP servers settings, available by default with no configuration needed.":
          "在你的 HuggingChat MCP 服务器设置中启用，默认可用无需配置",
        "Any Spaces added here will be instantly available in your MCP client.":
          "此处添加的任何应用空间将立即可用于你的 MCP 客户端",
        "to start chatting with 110+ available open weights models.":
          "开始与 110+ 个可用开源模型聊天",
        "Search MCP-compatible Spaces": "搜索 MCP 兼容的应用空间",
        "to get 40 minutes of daily compute usage on ZeroGPU Spaces (RTX Pro 6000 Blackwell hardware), including via MCP.":
          "每天获得 40 分钟 ZeroGPU Spaces 计算使用量（RTX Pro 6000 Blackwell 硬件），包括通过 MCP",
        "Open HuggingChat": "打开 HuggingChat",
        "Other Client": "其他客户端",
        "Browse MCP Spaces": "浏览 MCP 应用空间",
        "Share feedback": "分享反馈",
        "View MCP documentation": "查看 MCP 文档",
        "Built-in Tools": "内置工具",
        "Spaces Tools": "应用空间 工具",
        "Experimental": "实验性",
        "Disable tool": "禁用工具",
        "Open tool": "打开工具",
        "Remove tool": "移除工具",
        "Hub Query": "Hub 查询",
        "Documentation Semantic Search": "文档语义搜索",
        "Papers Semantic Search": "论文语义搜索",
        "Repository Search": "仓库搜索",
        "Spaces Semantic Search": "应用空间语义搜索",
        "File Management": "文件管理",
        "Create Repositories": "创建仓库",
        "Run and Manage Jobs": "运行和管理 Jobs",
        "Hub Repository Details": "Hub 仓库详情",
        "Dynamic Spaces": "动态应用空间",
        "Include repository README files": "包含仓库 README 文件",
        "Allow repository README files to be included in the results":
          "允许在结果中包含仓库 README 文件",
        "Remove Embedded Images": "移除嵌入图片",
        "Remove embedded images generated by Gradio Spaces":
          "移除 Gradio Spaces 生成的嵌入图片",
        "Dynamically call MCP Spaces at runtime":
          "在运行时动态调用 MCP 应用空间",
        "Run, monitor and schedule jobs on Hugging Face infrastructure":
          "在 Hugging Face 基础设施上运行、监控和调度作业",
        "Upload and write files to Repos and Buckets":
          "上传和写入文件到仓库和存储桶",
        "Create model, dataset, Space, and Bucket repositories":
          "创建模型、数据集、应用空间和存储桶仓库",
        "Get detailed information about Models, Datasets and Spaces":
          "获取模型、数据集和应用空间的详细信息",
        "Search for models, datasets and spaces with filters for author, tags etc.":
          "使用作者、标签等筛选条件搜索模型、数据集和 Spaces",
        "Search the Hugging Face documentation library":
          "搜索 Hugging Face 文档库",
        "Find ML Research Papers via natural language queries":
          "通过自然语言查询查找 ML 研究论文",
        "Find the best AI Apps via natural language queries":
          "通过自然语言查询查找最佳 AI 应用",
        "Natural-language navigator for the Hub. Efficiently query repositories, social graph, likes, collections and more. Uses Inference Provider quota.":
          "Hub 的自然语言导航器。高效查询仓库、社交图谱、点赞、收藏集等。使用推理供应商配额",
        "Click the \"Add to VSCode\" button for one-click install, or add the snippet below to your":
          "点击「Add to VSCode」按钮一键安装，或将以下代码段添加到你的 ",
        "Click the \"Add to Cursor\" button for one-click install, or add the snippet below to your":
          "点击「Add to Cursor」按钮一键安装，或将以下代码段添加到你的 ",
        "Enable in ChatGPT via Settings → Connectors → Advanced → Developer mode (Plus and Pro accounts only). Then create a new Connector using this MCP server URL:":
          "在 ChatGPT 中通过 Settings → Connectors → Advanced → Developer mode 启用（仅限 Plus 和 Pro 账户）。然后使用此 MCP 服务器 URL 创建新 Connector",
        "Add to VSCode": "添加到 VSCode",
        "Add to Cursor": "添加到 Cursor",
        "Add to LM Studio": "添加到 LM Studio",
        "Enable in ChatGPT via": "在 ChatGPT 中通过",
        "(Plus and Pro accounts only). Then create a new Connector using this MCP server URL:":
          "（仅限 Plus 和 Pro 账户）。然后使用此 MCP 服务器 URL 创建新 Connector",
        "Start Gemini CLI and enter": "启动 Gemini CLI 并输入",
        "to authenticate.": "以进行身份验证",
        "Use the command below to install the extension in Gemini CLI:":
          "使用以下命令在 Gemini CLI 中安装扩展",
        "The HuggingFace Gemini CLI extension bundles the MCP server with a context file and custom commands, teaching Gemini how to better use all tools.":
          "HuggingFace Gemini CLI 扩展将 MCP 服务器与上下文文件和自定义命令捆绑，指导 Gemini 如何更好地使用所有工具",
        "Run the following command:": "运行以下命令：",
        "Go to the": "前往",
        "page in Claude, click \"Browse Connectors\" and select":
          "页面，点击「Browse Connectors」并选择",
        "connector.": "Connector",
        "Create a new": "创建新的",
        "HF token (READ)": "HF 令牌（只读）",
        ", add the snippet below into": "，将以下代码段添加到",
        "then update": "然后更新",
        "with your actual token.": "为你的实际令牌",
        "If your client doesn't support OAuth, ensure they include an \"Authorization\" header with a new":
          "如果你的客户端不支持 OAuth，请确保在请求中包含带有新",
        "Read HF token": "只读 HF 令牌",

        // 硬件设置页
        "My Hardware": "我的硬件",
        "Add new Hardware": "添加新硬件",
        "Add item": "添加项目",
        "Browse community hardware": "浏览社区硬件",
        "CPU": "CPU",
        "GPU": "GPU",
        "Apple Silicon": "Apple Silicon",
        "Amazing!": "太棒了！",
        "GPU poor": "GPU 贫民",
        "GPU rich": "GPU 富豪",
        "Publicly Visible": "公开可见",
        "Set as primary - it will appear first on model pages":
          "设为主要硬件 - 将首先显示在模型页面上",
        "Set your preferred hardware": "设置你的首选硬件",
                
        // 其他设置页通用

        // 付款信息页
        "Payment method": "付款方式",
        "There is no payment method for this account.": "此账户无付款方式",
        "Add a payment method": "添加付款方式",

        // 订阅页
        "Subscribe to PRO": "订阅 PRO",
        "Articles: Write and publish blog articles on your HF profile":
          "文章：在你的 HF 个人主页编写和发布博客文章",
        "Features Preview: Get exclusive early access to upcoming features":
          "功能预览：独占提前体验即将推出的功能",
        "PRO Badge: Show your support on your profile":
          "PRO 徽章：在你的个人主页展示你的支持",
        "Monthly invoices": "月度发票",

        // 个人主页
        "Add status": "添加状态",
        "0 followers": "0 关注者",
        "6 following": "6 关注中",
        "followers": "关注者",
        "following": "关注中",
        "Edit profile": "编辑个人资料",
        "AI & ML interests": "AI 与 ML 兴趣",
        "None yet": "暂无",
        "No public activity": "暂无公开动态",
        "Create a new model repository": "创建新模型仓库",
        "Create model": "创建模型",
        "A repository contains all model files, including the revision history.":
          "仓库包含所有模型文件及修订历史",
        "Once your model is created, you can upload your files using the web interface or git.":
          "模型创建后，你可以使用网页界面或 git 上传文件",
        "Anyone on the internet can see this model.": "互联网上的任何人都可以查看此模型",
        "Only you can commit.": "只有你可以提交",
        "Only you can see and commit to this model.": "只有你可以查看和提交到此模型",
        "name": "名称",
        "space": "应用空间",
        "Base template": "基础模板",
        "Create new dataset": "创建新数据集",
        "Create a new dataset repository": "创建新数据集仓库",
        "A repository contains all dataset files, including the revision history.":
          "仓库包含所有数据集文件及修订历史",
        "Anyone on the internet can see this dataset.": "互联网上的任何人都可以看到此数据集",
        "Only you can see and commit to this dataset.": "只有你可以查看和提交到此数据集",
        "Once your dataset is created, you can upload your files using the web interface or git.":
          "数据集创建后，你可以使用网页界面或 git 上传文件",
        "Create dataset": "创建数据集",
        "Start from an existing dataset": "从现有数据集开始",
        "New dataset name": "新数据集名称",
        "Create a Space": "创建应用空间",
        "Create a new Space": "创建新应用空间",
        "Create Space": "创建应用空间",
        "Short description": "简短描述",
        "Select the Space SDK": "选择应用空间 SDK",
        "Space hardware": "应用空间硬件",
        "You can switch to a different hardware at any time in your Space settings.":
          "你可以随时在应用空间设置中切换到其他硬件",
        "Enable dev mode": "启用开发模式",
        "Dev mode allows you to remotely access your Space using SSH or VS Code.":
          "开发模式允许你通过 SSH 或 VS Code 远程访问你的应用空间",
        "Mount a bucket to this Space": "将存储桶挂载到该应用空间",
        "Attach a storage bucket for persistent data. You can mount additional buckets from your Space settings.":
          "附加存储桶以持久化数据。你可以从应用空间设置中挂载额外的存储桶",
        "Storage Bucket": "存储桶",
        "Bucket visibility": "存储桶可见性",
        "Mount path": "挂载路径",
        "Access mode": "访问模式",
        "Read & Write": "读写",
        "Read-only": "只读",
        "Select a bucket": "选择存储桶",
        "Create new bucket": "创建新存储桶",
        "Mount existing bucket": "挂载已有存储桶",
        "Search for a bucket…": "搜索存储桶…",
        "No results found :(": "未找到结果 :(",
        "Protected": "受保护",
        "Only you can see and commit to the code.": "只有你可以查看和提交代码",
        "Only you can see and commit to this Space.": "只有你可以查看和提交到此应用空间",
        "Anyone on the internet can see this Space.": "互联网上的任何人都可以查看此应用空间",
        "The app is publicly accessible via its URL, but the code and repo are private.":
          "应用可通过 URL 公开访问，但代码和仓库是私有的",
        "PRO subscribers": "PRO 订阅者",
        "are Git repositories that host application code for Machine Learning demos.":
          "是基于 Git 的仓库，托管机器学习演示的应用代码",
        "You can build Spaces with Python libraries like": "你可以使用 Python 库构建应用空间，例如",
        "You can choose between": "你可以选择",
        ", or": "，或",
        ", or using": "，或使用",
        "to host your Space.": "托管你的应用空间",
        "to use dev mode.": "使用开发模式",
        "to use protected Spaces.": "使用受保护的应用空间",
        "Learn more.": "了解更多",
        "BETA": "测试版",
        "Short Description": "简短描述",
        "New Space name": "新应用空间名称",
        "Choose a Gradio template:": "选择 Gradio 模板：",
        "Space Dev Mode": "应用空间开发模式",
        "Gradio": "Gradio",
        "Docker": "Docker",
        "Blank": "空白",
        "Diffusion LoRA": "扩散 LoRA",
        "Diffusion LoRA template": "扩散 LoRA 模板",
        "Description": "描述",
        "A brief description of how this model works": "关于模型工作方式的简要描述",
        "Display name": "显示名称",
        "The model name in the model card": "模型卡片中的模型名称",
        "Base model": "基础模型",
        "The model from which this was fine-tuned": "该模型微调自",
        "Trigger word(s)": "触发词",
        "Separated by a comma": "用逗号分隔",
        "Upload your LoRA weights": "上传 LoRA 权重",
        "Upload images, audio, and videos by dragging in the text input, pasting, or":
          "通过拖放到文本输入框、粘贴或",
        "clicking here": "点击此处",
        "Upload image generation examples": "上传图像生成示例",
        "Drag files/folders here or click to browse your computer.":
          "将文件/文件夹拖到此处，或点击浏览你的电脑",
        "Drag images here or click to browse your computer.":
          "将图片拖到此处，或点击浏览你的电脑",
        "Tap here to upload files/folders": "点击上传文件/文件夹",
        "Tap here to upload images": "点击上传图片",
        "Tap or paste here to upload images": "点击或粘贴上传图片",
        "Supported file types: .jpg, .png, .webp": "支持的文件类型：.jpg, .png, .webp",
        "Supported file types: .safetensors, .bin, .ckpt, .onnx, .pt, .pkl, .yaml, .yml, .zip":
          "支持的文件类型：.safetensors, .bin, .ckpt, .onnx, .pt, .pkl, .yaml, .yml, .zip",
        "CPU Basic": "基础 CPU",
        "Use this dataset": "使用此数据集",
        "Model size": "模型大小",
        "Tensor type": "张量类型",
        "Finetuned": "微调版",
        "Quantized": "量化版",
        "Datasets used to train": "训练使用的数据集",
        "Finetunes": "微调版本",
        "Quantizations": "量化版本",
        "Files and versions": "文件和版本",
        "Collections including": "包含收藏集",
        "Collection including": "包含收藏集",
        "License:": "许可证：",
        "File Security Scans": "文件安全扫描",
        "not a model": "非模型文件",
        "not a pickle": "非 pickle 文件",
        "Queued": "队列中",
        "No issue": "无问题",
        "raw": "原始",
        "blame": "追溯",
        "history": "历史",
        "edit": "编辑",
        "delete": "删除",
        "preview": "预览",
        "metadata": "元数据",
        "code": "代码",
        "Copy download link": "复制下载链接",
        "Copy to bucket": "复制到存储桶",
        "Notebooks": "笔记本",
        "Use Docker": "使用 Docker",
        "Use Docker images": "使用 Docker 镜像",
        "This model isn't deployed by any Inference Provider.": "此模型未由任何推理供应商部署。",
        "Ask for provider support": "向供应商请求支持",
        "Inference providers allow you to run inference using different serverless providers.": "推理供应商允许你使用不同的无服务器提供商运行推理。",
        "Install from pip and serve model": "通过 pip 安装并启动模型",
        "to use this model in": "以在此应用中使用此模型",
        "Adapter": "适配器",
        "Dataset card": "数据集卡片",
        "Edit dataset card": "编辑数据集卡片",
        "Model card": "模型卡片",
        "Edit model card": "编辑模型卡片",
        "Files info": "文件信息",
        "Chat template": "聊天模板",
        "Browse Quantizations": "浏览量化版本",
        "Downloads last month": "月下载量",
        "Total file size:": "总文件大小：",
        "Number of rows:": "行数：",
        "disabled": "已禁用",
        "enabled": "已启用",
        "Data Studio": "数据工作室",
        "Expand in Data Studio": "在数据工作室中展开",
        "Auto-converted": "自动转换",
        "to Parquet": "为 Parquet",
        "like": "赞",
        "SQL Console": "SQL 控制台",
        "Embed": "嵌入",
        "Duplicate": "复制",
        "Duplicate this model": "复制此模型",
        "Duplicate this dataset": "复制此数据集",
        "Clone repository": "克隆仓库",
        "Request DOI": "申请 DOI",
        "Add to collection": "添加到收藏集",
        "Watch Activity": "关注动态",
        "Watch all activity": "关注所有动态",
        "New discussion": "新建讨论",
        "New pull request": "新建拉取请求",
        "Pull requests": "拉取请求",
        "Code of Conduct": "行为准则",
        "Hub documentation": "Hub 文档",
        "PR & discussions documentation": "PR 和讨论文档",
        "Hardware compatibility": "硬件兼容性",
        "You need to agree to share your contact information to access this model": "你需要同意共享你的联系信息才能访问此模型",
        "This repository is publicly accessible, but": "此仓库可公开访问，但",
        "you have to accept the conditions to access its files and content": "你必须接受条件才能访问其文件和内容。",
        "By agreeing you accept to share your contact information (email and username) with the repository authors.": "同意即表示你接受与仓库作者共享你的联系信息（邮箱和用户名）。",
        "Agree and access repository": "同意并访问仓库",
        "Model access": "模型访问",
        "Report this model": "举报此模型",
        "Report this dataset": "举报此数据集",
        "What's Included": "包含内容",
        "What's Excluded": "排除内容",
        "Launch Blog": "发布博客",
        "Model tree for": "模型树：",
        "Space using": "使用的应用空间：",
        "Spaces using": "使用的应用空间：",
        "+ 2 Spaces": "+ 2 应用空间",
        "Benefits": "优势",
        "Best Practices": "最佳实践",
        "Column": "列",
        "Notes": "注释",
        "Modalities:": "模态：",
        "Formats:": "格式：",
        "Languages:": "语言：",
        "license": "许可证",
        "task_categories": "任务分类",
        "tags": "标签",
        "language": "语言",
        "pretty_name": "显示名称",
        "size_categories": "大小分类",
        "Tags:": "标签：",
        "Libraries:": "库：",
        "Size:": "大小：",
        "Expand": "展开",
        "End of preview.": "预览结束。",
        "Custom Hardware": "自定义硬件",
        "-- Select a custom hardware --": "-- 选择自定义硬件 --",
        "ZeroGPU": "ZeroGPU",
        "Trackio": "Trackio",
        "chatbot": "聊天机器人",
        "leaderboard": "排行榜",
        "text-to-image": "文本到图像",
        "Mentioned": "提及",
        "Participating": "参与",
        "Unfollow": "取消关注",
        "Upvoted": "已赞同",
        "Unread": "未读",
        "Done": "已完成",
        "Select All": "全选",
        "Leave a feedback": "留下反馈",
        "Notifications doc": "通知文档",
        "Notifications settings": "通知设置",
        "'s Collections": "的收藏集",
        "Description of this collection": "此收藏集的描述",
        "Recent Activity": "最近动态",
        "View all activity": "查看所有动态",
        "Filter by title": "按标题筛选",
        "Most reactions": "最多回应",
        "Filter models by name": "按名称筛选模型",
        "Filter datasets by name": "按名称筛选数据集",
        "datasets": "数据集",
        "Tasks:": "任务：",
        "Datasets:": "数据集：",
        "Contribute": "贡献",
        "Create new file": "创建新文件",
        "Create a new file": "创建新文件",
        "Safe": "安全",
        "History:": "历史：",
        "History": "历史",
        "Commit new file": "提交新文件",
        "Commit new file to": "提交新文件到 ",
        "Commit directly to the": "直接提交到 ",
        "branch": "分支",
        "Open a Pull Request": "发起拉取请求",
        "Propose changes": "提议更改",
        "+ Add Pretty name": "+ 添加显示名称",
        "+ Add Task from hf.co/tasks": "+ 从 hf.co/tasks 添加任务",
        "Open as a pull request to the": "以 PR 形式提交到 ",
        "Name your file": "输入文件名",
        "About discussion": "关于讨论",
        "Start discussing with the repository author(s) and the community.": "开始与仓库作者和社区讨论。",
        "Make things better": "做出改进",
        "Start the discussion": "开始讨论",
        "Be the first to open a discussion on this repository": "成为第一个在此仓库发起讨论的人",
        "Be the first to open a pull request on this repository": "成为第一个在此仓库发起拉取请求的人",
        "Metadata UI": "元数据编辑",
        "Commit changes": "提交更改",
        "Commit changes to main": "提交更改到 main",
        "+ Add Base Model": "+ 添加基础模型",
        "+ Add Datasets": "+ 添加数据集",
        "+ Add Languages": "+ 添加语言",
        "+ Add Library": "+ 添加库",
        "+ Add Metrics": "+ 添加指标",
        "+ Add New Version": "+ 添加新版本",
        "+ Add Tags": "+ 添加标签",
        "Update README.md": "更新 README.md",
        "Add an extended description...": "添加扩展描述...",
        "Create discussion": "创建讨论",
        "Title": "标题",
        "Add a description": "添加描述",
        "Announcement blog post": "公告博客帖子",
        "Change model visibility": "更改模型可见性",
        "Delete this model": "删除此模型",
        "I understand, delete this model": "我理解，删除此模型",
        "I understand, move this model": "我理解，移动此模型",
        "Rename or transfer this model": "重命名或转移此模型",
        "Generate a Digital Object Identifier for this model.": "为此模型生成数字对象标识符。",
        "This model is currently": "此模型当前为",
        "for this model.": "对此模型。",
        "for this model. Members of the community": "对此模型。社区成员",
        "model repository and all its files": "模型仓库及其所有文件",
        ", including weights": "，包括权重",
        "Change dataset visibility": "更改数据集可见性",
        "Community contributions": "社区贡献",
        "Delete this dataset": "删除此数据集",
        "Digital Object Identifier (DOI)": "数字对象标识符 (DOI)",
        "Disable Discussions and PRs": "禁用讨论和 PR",
        "Enable Access requests": "启用访问请求",
        "Gated user access": "门控用户访问",
        "Generate DOI": "生成 DOI",
        "I understand, delete this dataset": "我理解，删除此数据集",
        "I understand, move this dataset": "我理解，移动此数据集",
        "LFS Files": "LFS 文件",
        "List Large Files": "列出大文件",
        "Content OID": "内容 OID",
        "Pushed by": "推送者",
        "Pushed date": "推送日期",
        "Remove selected": "移除选中",
        "Download file": "下载文件",
        "Remove from this repository": "从此仓库移除",
        "Rename or transfer this dataset": "重命名或转移此数据集",
        "Storage Usage": "存储用量",
        "Storage overview": "存储概览",
        "Total downloads": "总下载量",
        "Xet storage": "Xet 存储",
        "can": "可以",
        "defined in": "定义在",
        "this model": "本模型",
        "be undone": "撤消",
        "dataset repository and all its files": "数据集仓库及其所有文件",
        "user settings": "用户设置",
        "(all time)": "（总计）",
        "Large File Storage Used": "大文件存储使用",
        "Access requests": "访问请求",
        "Discussions and Pull Requests": "讨论和拉取请求",
        "are currently": "当前为",
        "for this dataset.": "对此数据集。",
        "for this dataset. Members of the community": "对此数据集。社区成员",
        "propose changes to this repository.": "对此仓库提出更改。",
        "Default sorting in the Community Tab:": "社区标签默认排序：",
        "Allow CI/CD workflows to push to this repo without long-lived tokens.": "允许 CI/CD 工作流无需长期令牌即可推送到此仓库。",
        "Generate a Digital Object Identifier for this dataset.": "为此数据集生成数字对象标识符。",
        "Xet is currently enabled.": "Xet 当前已启用。",
        "This dataset is currently": "此数据集当前为",
        "all time": "总计",
        "Anyone on the internet can see this dataset. Only you can commit.":
          "互联网上的任何人都可以看到此数据集。只有你可以提交。",
        "All links to this model will automatically redirect to the new location, including git operations. However, to avoid confusion, we recommend updating any existing local clones to point to the new repository URL. To do so, you can use the following command:":
          "此模型的所有链接将自动重定向到新位置，包括 git 操作。为避免混淆，建议更新现有本地克隆以指向新的仓库 URL。你可以使用以下命令：",
        "All links to this dataset will automatically redirect to the new location, including git operations. However, to avoid confusion, we recommend updating any existing local clones to point to the new repository URL. To do so, you can use the following command:":
          "此数据集的所有链接将自动重定向到新位置，包括 git 操作。为避免混淆，建议更新现有本地克隆以指向新的仓库 URL。你可以使用以下命令：",
        "Anyone on the internet can see this model. Only you can commit.": "互联网上的任何人都可以查看此模型。只有你可以提交。",
        "When enabled, users must share their contact information (email and username) and agree to your terms and conditions (if any) in order to access this model. You can download the list of users who have accepted and had access at any time.":
          "启用后，用户必须分享其联系信息（邮箱和用户名）并同意你的条款和条件（如有）才能访问此模型。你可以随时下载已接受并拥有访问权限的用户列表。",
        "When enabled, users must share their contact information (email and username) and agree to your terms and conditions (if any) in order to access this dataset. You can download the list of users who have accepted and had access at any time.":
          "启用后，用户必须分享其联系信息（邮箱和用户名）并同意你的条款和条件（如有）才能访问此数据集。你可以随时下载已接受并拥有访问权限的用户列表。",
        "Xet is HF Hub's new storage technology, offering up to 10x greater performance compared to Git LFS. Xet is currently":
          "Xet 是 HF Hub 的新型存储技术，相比 Git LFS 提供高达 10 倍的性能。Xet 当前",
        "be undone. It will no longer be possible to delete, rename, transfer, or change the visibility to private.":
          "撤消。将无法再删除、重命名、转移或将可见性更改为私有。",
        "Check out our documentation": "查看我们的文档",
        "Possible filename:": "可能文件名：",
        "Git LFS files are tracked using SHA-256 object IDs, rather than file paths, to optimize performance. This approach is necessary because a single object can be referenced by multiple paths across different commits, making it impractical to search and resolve these connections.":
          "Git LFS 文件使用 SHA-256 对象 ID 而非文件路径进行跟踪，以优化性能。此方法之所以必要，是因为单个对象可能被不同提交中的多个路径引用，使得搜索和解析这些连接变得不切实际。",
        "to learn how to know which filename(s) is(are) associated with each SHA.":
          "以了解如何确定每个 SHA 关联的文件名。",
        "to ask for access.": "以请求访问。",
      },

      regexp: [
        [/(\d+) templates?/, "$1 个模板"],
        [/Updated (\d+) days? ago/, "更新于 $1 天前"],
        [/Updated (\d+) hours? ago/, "更新于 $1 小时前"],
        [/Updated (\d+) minutes? ago/, "更新于 $1 分钟前"],
        [/Updated about (\d+) hours? ago/, "更新于约 $1 小时前"],
        [/Updated about (\d+) minutes? ago/, "更新于约 $1 分钟前"],
        [/Updated just now/, "刚刚更新"],
        [/^Added (\d+月\d+日)$/, "已添加 $1"],
        // 月份日期转换 Jan 25 → 1月25日（仅匹配1-2位数字日期）
        [/Jan (\d{1,2})\b/, "1月$1日"],
        [/Feb (\d{1,2})\b/, "2月$1日"],
        [/Mar (\d{1,2})\b/, "3月$1日"],
        [/Apr (\d{1,2})\b/, "4月$1日"],
        [/May (\d{1,2})\b/, "5月$1日"],
        [/Jun (\d{1,2})\b/, "6月$1日"],
        [/Jul (\d{1,2})\b/, "7月$1日"],
        [/Aug (\d{1,2})\b/, "8月$1日"],
        [/Sep (\d{1,2})\b/, "9月$1日"],
        [/Oct (\d{1,2})\b/, "10月$1日"],
        [/Nov (\d{1,2})\b/, "11月$1日"],
        [/Dec (\d{1,2})\b/, "12月$1日"],
        // 完整日期 8 Jun 2026 → 2026年6月8日
        [/\b(\d{1,2}) Jan (\d{4})\b/, "$2年1月$1日"],
        [/\b(\d{1,2}) Feb (\d{4})\b/, "$2年2月$1日"],
        [/\b(\d{1,2}) Mar (\d{4})\b/, "$2年3月$1日"],
        [/\b(\d{1,2}) Apr (\d{4})\b/, "$2年4月$1日"],
        [/\b(\d{1,2}) May (\d{4})\b/, "$2年5月$1日"],
        [/\b(\d{1,2}) Jun (\d{4})\b/, "$2年6月$1日"],
        [/\b(\d{1,2}) Jul (\d{4})\b/, "$2年7月$1日"],
        [/\b(\d{1,2}) Aug (\d{4})\b/, "$2年8月$1日"],
        [/\b(\d{1,2}) Sep (\d{4})\b/, "$2年9月$1日"],
        [/\b(\d{1,2}) Oct (\d{4})\b/, "$2年10月$1日"],
        [/\b(\d{1,2}) Nov (\d{4})\b/, "$2年11月$1日"],
        [/\b(\d{1,2}) Dec (\d{4})\b/, "$2年12月$1日"],
        // 完整月份 + 年份 January 2026 → 2026年1月
        [/^January (\d{4})$/, "$1年1月"],
        [/^February (\d{4})$/, "$1年2月"],
        [/^March (\d{4})$/, "$1年3月"],
        [/^April (\d{4})$/, "$1年4月"],
        [/^May (\d{4})$/, "$1年5月"],
        [/^June (\d{4})$/, "$1年6月"],
        [/^July (\d{4})$/, "$1年7月"],
        [/^August (\d{4})$/, "$1年8月"],
        [/^September (\d{4})$/, "$1年9月"],
        [/^October (\d{4})$/, "$1年10月"],
        [/^November (\d{4})$/, "$1年11月"],
        [/^December (\d{4})$/, "$1年12月"],
        [/^(\d+) items?$/, "$1 个项目"],
        [/^(\d+) models?$/, "$1 个模型"],
        [/updated (\d+) models?/i, "更新了 $1 个模型"],
        [/^(\d+) days? ago$/, "$1 天前"],
        [/^(\d+) hours? ago$/, "$1 小时前"],
        [/^(\d+) minutes? ago$/, "$1 分钟前"],
        [/^about (\d+) hours? ago$/, "约 $1 小时前"],
        [/^about (\d+) days? ago$/, "约 $1 天前"],
        [/^about (\d+) months? ago$/, "约 $1 个月前"],
        [/^#(\d+) opened about (\d+) hours? ago by$/, "#$1 约 $2 小时前打开 由 "],
        [/^#(\d+) opened about (\d+) days? ago by$/, "#$1 约 $2 天前打开 由 "],
        [/^#(\d+) opened about (\d+) months? ago by$/, "#$1 约 $2 个月前打开 由 "],
[/^#(\d+) opened (\d+) months? ago by$/, "#$1 $2 个月前打开 由 "],
        [/^#(\d+) opened about (\d+) years? ago by$/, "#$1 约 $2 年前打开 由 "],
        [/^#(\d+) opened over (\d+) years? ago by$/, "#$1 超过 $2 年前打开 由 "],
        [/^#(\d+) opened (\d+) days? ago by$/, "#$1 于 $2 天前打开 由 "],
        [/^#(\d+) opened (\d+) years? ago by$/, "#$1 $2 年前打开 由 "],
        [/^(\d+) following$/, "$1 关注中"],
        [/^(\d+) months? ago$/, "$1 个月前"],
        [/^last (\d+) days?$/, "过去 $1 天"],
        [/updated (\d+) collections?/i, "更新了 $1 个收藏集"],
        [/^View closed \((\d+)\)$/, "查看已关闭 ($1)"],
        [/^Remove selected \((\d+)\)$/, "移除选中 ($1)"],
        [/^Split \((\d+)\)$/, "拆分 ($1)"],
        [/^Subset \((\d+)\)$/, "子集 ($1)"],
        [/(\d+) collections?/i, "$1 个收藏集"],
        [/(\d+) datasets?/i, "$1 个数据集"],
        [/(\d+) models?/i, "$1 个模型"],
        [/(\d+) items?/i, "$1 个项目"],
        [/(\d+) repositories?/i, "$1 个仓库"],
        [/(\d+) applications?/i, "$1 个应用"],
        [/(\d+) contributors?/i, "$1 个贡献者"],
        [/(\d+) commits?/i, "$1 次提交"],
        [/^an update$/, "动态"],
        [/^a dataset$/i, "一个数据集"],
[/^a collection$/i, "一个收藏集"],
        [/^a model$/i, "一个模型"],
        [/^a Space$/i, "一个应用空间"],
        [/^Inbox \((\d+)\)$/, "收件箱 ($1)"],
        [/^Unread \((\d+)\)$/, "未读 ($1)"],
        [/^Please type (.+) to confirm\.$/, "请输入 $1 以确认"],
        [/^\+ (\d+) more$/, "更多 $1 个"],
        [/^\+(\d+)$/, "共 $1 个"],
        [/^Used storage: [\d.]+ Bytes$/, "已用存储：$&"],
        [/^You have consumed \$([\d.]+) out of your \$([\d.]+) included credits\.$/, "已使用 $1 / $2 Credits"],
        [/^Models · ([\d.]+ [kMGTP]?B)$/, "模型 · $1"],
        [/^Datasets · ([\d.]+ [kMGTP]?B)$/, "数据集 · $1"],
        [/^Spaces · ([\d.]+ [kMGTP]?B)$/, "应用空间 · $1"],
        [/^Buckets · ([\d.]+ [kMGTP]?B)$/, "存储桶 · $1"],
        [/^Models — (\d+)%$/, "模型 — $1%"],
        [/^Datasets — (\d+)%$/, "数据集 — $1%"],
        [/^([<>=]?\s*)(\d+)% used$/, "已用 $1$2%"],
        [/^([\d.]+[kMGTP]?B) params?$/, "$1 参数"],
        [/^(\d+) repos · ([\d.]+ [kMGTP]?B)$/, "$1 个仓库 · $2"],
        [/^of ([\d.]+ [kMGTP]?B)$/, "/ $1"],
[/^You have a total of ([\d.]+) TFLOPS of computing power\.$/, "你总共拥有 $1 TFLOPS 的计算能力"],
        [/^Access to (model|dataset) .+ is restricted and you are not in the authorized list\. Visit$/, "访问 $1 受限，你不在授权列表中。请访问 "],
      ],

      selector: [
        ["a[href='/models']", "模型"],
        ["a[href='/datasets']", "数据集"],
        ["a[href='/spaces']", "应用空间"],
        ["a[href='/docs']", "文档"],
        ["a[href='/pricing']", "定价"],
        ["a[href='/enterprise']", "企业版"],
        ["a[href='/blog']", "博客"],
        ["a[href='/posts']", "帖子"],
        ["a[href='/forum']", "论坛"],
        ["a[href='/about']", "关于"],
        ["a[href='/chat']", "HuggingChat"],
        ["a[href='/papers']", "每日论文"],
        ["a[href='/login']", "登录"],
        ["a[href='/signup']", "注册"],
        ["footer a[href='/models']", "模型"],
        ["footer a[href='/datasets']", "数据集"],
        ["footer a[href='/spaces']", "应用空间"],
        ["footer a[href='/pricing']", "定价"],
        ["footer a[href='/docs']", "文档"],
        ["footer a[href='/privacy']", "隐私政策"],
      ],

      title: {
        static: {
          // 主页
          "Hugging Face – The AI community building the future.": "Hugging Face — AI 社区",
          // 连字符 - 变体（Spaces、Pricing 等用）
          "Spaces - Hugging Face": "应用空间 — Hugging Face",
          "Pricing - Hugging Face": "定价 — Hugging Face",
          "Daily Papers - Hugging Face": "每日论文 — Hugging Face",
          "Welcome - Hugging Face": "欢迎 — Hugging Face",
          "Organizations - Hugging Face": "组织 — Hugging Face",
          "Collections - Hugging Face": "收藏集 — Hugging Face",
          "Storage - Hugging Face": "存储 — Hugging Face",
          "Tasks - Hugging Face": "任务 — Hugging Face",
          "Team & Enterprise Plans - Hugging Face": "团队与企业版 — Hugging Face",
          "Hugging Face - Documentation": "Hugging Face — 文档",
          "Hugging Face - Learn": "Hugging Face — 学习",
          // 短破折号 – 变体（Models、Datasets、Blog 等用）
          "Models – Hugging Face": "模型 — Hugging Face",
          "Datasets – Hugging Face": "数据集 — Hugging Face",
          "Hugging Face – Blog": "Hugging Face — 博客",
          "Hugging Face – Posts": "Hugging Face — 动态",
          "Spaces Launch – Hugging Face": "创建应用空间 — Hugging Face",
          "404 – Hugging Face": "404 — Hugging Face",
          "PRO Account - Hugging Face": "PRO 账户 — Hugging Face",
          "New Storage Bucket": "新建存储桶",
          "Hugging Face - Create a new Collection": "Hugging Face — 创建新收藏集",
        },
        regexp: [
          // 存储桶详情 "name - Storage Bucket" → 保留桶名
          [/^(.+?) - Storage Bucket$/, "$1 — 存储桶"],
          [/^(.+?) Settings - Storage Bucket$/, "$1 — 存储桶设置"],
          // 模型详情 "user/model · Hugging Face" → 保留模型名
          // 数据集详情 "user/ds · Datasets at Hugging Face"
          // 应用空间详情 "Name - a Hugging Face Space by user" → 保留原名
          // 上传到存储桶 "Upload to bucket-name"
          [/^Upload to (.+)$/, "上传到 $1"],
          // 旧版 huggingface.co 路径格式
          [/(.+) \/ huggingface\.co/, "$1 — Hugging Face"],
        ],
      },
    },

    /* ---- 页面特定翻译 ---- */
    // 目前大多数字段已在 public.static 里覆盖，
    // 页面特定的词条按需添加即可

    datasets: {
      selector: [["h1", "数据集"]],
    },
    models: {
      selector: [["h1", "模型"]],
    },
    spaces: {
      selector: [["h1", "应用空间"]],
    },
  };

  /* ========================================================================
   *  翻译引擎
   * ======================================================================== */

  const CONFIG = {
    LANG: "zh-CN",
    PAGE_PATTERNS: [
      ["login", /^\/login(\/|$)/],
      ["signup", /^\/signup(\/|$)/],
      ["settings", /^\/settings(\/|$)/],
      ["pricing", /^\/pricing(\/|$)/],
      ["enterprise", /^\/enterprise(\/|$)/],
      // 具体路径要放在通用路径之前匹配
      ["dataset-detail", /^\/datasets\/[^\/]+\/[^\/]+$/],
      ["datasets", /^\/datasets(\/|$)/],
      ["space-detail", /^\/spaces\/[^\/]+\/[^\/]+$/],
      ["spaces", /^\/spaces(\/|$)/],
      ["model-detail", /^\/[^\/]+\/[^\/]+$/],
      ["models", /^\/models(\/|$)/],
      ["docs", /^\/docs(\/|$)/],
      ["blog", /^\/blog(\/|$)/],
      ["posts", /^\/posts(\/|$)/],
      ["papers", /^\/papers(\/|$)/],
      ["chat", /^\/chat(\/|$)/],
      ["tasks", /^\/tasks(\/|$)/],
      ["organizations", /^\/organizations(\/|$)/],
      ["profile", /^\/[^\/]+$/],
    ],
    OBSERVER_CONFIG: {
      childList: true,
      subtree: true,
      characterData: true,
      attributeFilter: ["value", "placeholder", "aria-label", "title"],
    },
    STYLES: `
            .hf-trans-btn {
                color: #6366f1;
                font-size: small;
                cursor: pointer;
                margin-top: 4px;
                display: inline-block;
            }
            .hf-trans-result {
                margin-top: 6px;
                padding: 6px 10px;
                border: 1px solid #e5e7eb;
                border-radius: 6px;
                background: #f9fafb;
                font-size: 0.875rem;
            }
            @media (prefers-color-scheme: dark) {
                .hf-trans-result {
                    border-color: #374151;
                    background: #1f2937;
                }
            }
        `,
  };

  const State = {
    pageConfig: null,
    currentURL: window.location.href,
    observer: null,
    features: {
      enableRegExp: GM_getValue("hf_enableRegExp", true),
      enableTransAttr: GM_getValue("hf_enableTransAttr", true),
    },
  };

  /* ========================================================================
   *  工具
   * ======================================================================== */
  function safe(fn, label) {
    return function (...args) {
      try {
        return fn.apply(this, args);
      } catch (e) {
        console.error(`[HF 汉化] ${label} 出错:`, e);
      }
    };
  }

  /* ========================================================================
   *  初始化
   * ======================================================================== */
  function init() {
    try {
      document.documentElement.lang = CONFIG.LANG;
    } catch (e) {
      console.error("[HF] 设置语言失败:", e);
    }

    // 注意：GM_* 函数如果缺少 @grant 会抛出 ReferenceError，
    // 下面每步都独立 try-catch，确保不会一个失败卡死全部
    try {
      GM_addStyle(CONFIG.STYLES);
    } catch (e) {
      console.warn("[HF] GM_addStyle 失败:", e);
    }

    try {
      setupMenuCommands();
    } catch (e) {
      console.warn("[HF] 菜单设置失败:", e);
    }

    setupInitTrans();
    setupUrlDetection();

    // 监听 <title> 变化（Next.js 会动态改标题）
    try {
      const titleEl = document.querySelector("title");
      if (titleEl) {
        new MutationObserver(() => {
          if (State.pageConfig) safe(transTitle, "标题变化")();
        }).observe(titleEl, { childList: true, subtree: true });
      }
    } catch (e) {
      console.warn("[HF] 标题监听失败:", e);
    }
  }

  /* ========================================================================
   *  用户菜单
   * ======================================================================== */
  let menuIds = [];

  function setupMenuCommands() {
    menuIds.forEach((id) => GM_unregisterMenuCommand(id));
    menuIds = [];

    menuIds.push(
      GM_registerMenuCommand(`${State.features.enableRegExp ? "禁用" : "启用"} 正则翻译`, () => {
        State.features.enableRegExp = !State.features.enableRegExp;
        GM_setValue("hf_enableRegExp", State.features.enableRegExp);
        if (State.features.enableRegExp && State.pageConfig)
          safe(traverseNode, "重新遍历")(document.body);
        setupMenuCommands();
      }),
    );
    menuIds.push(
      GM_registerMenuCommand(`${State.features.enableTransAttr ? "禁用" : "启用"} 属性翻译`, () => {
        State.features.enableTransAttr = !State.features.enableTransAttr;
        GM_setValue("hf_enableTransAttr", State.features.enableTransAttr);
        if (State.features.enableTransAttr && State.pageConfig)
          safe(traverseNode, "重新遍历")(document.body);
        setupMenuCommands();
      }),
    );
  }

  /* ========================================================================
   *  初始翻译
   * ======================================================================== */
  function setupInitTrans() {
    function doInit() {
      setupMutationObserver();
      updatePageConfig("首次载入");
      if (State.pageConfig) safe(traverseNode, "首次遍历")(document.body);
      if (State.pageConfig) {
        safe(transTitle, "标题翻译")();
        safe(transBySelector, "选择器翻译")();
      }
      setTimeout(() => {
        if (State.pageConfig) safe(traverseNode, "延迟补扫")(document.body);
      }, 1500);
      setTimeout(() => {
        if (State.pageConfig) safe(traverseNode, "延迟补扫2")(document.body);
      }, 4000);
    }
    // body 一出现就开始翻译，不等 DOMContentLoaded
    if (document.body) {
      doInit();
    } else {
      // body 还没创建，用 requestAnimationFrame 轮询等待
      const waitBody = () => {
        if (document.body) {
          doInit();
          return;
        }
        requestAnimationFrame(waitBody);
      };
      requestAnimationFrame(waitBody);
    }
  }

  /* ========================================================================
   *  URL 变化检测（SPA）
   * ======================================================================== */
  let _lastURL = window.location.href;

  function setupUrlDetection() {
    window.addEventListener("popstate", handleURLChange);
    const origPush = history.pushState;
    const origReplace = history.replaceState;
    history.pushState = function (...args) {
      origPush.apply(this, args);
      handleURLChange();
    };
    history.replaceState = function (...args) {
      origReplace.apply(this, args);
      handleURLChange();
    };
  }

  function handleURLChange() {
    const url = window.location.href;
    if (url === _lastURL) return;
    _lastURL = url;
    State.currentURL = url;
    updatePageConfig("URL变化");
    if (!State.pageConfig) return;
    if (State.observer) State.observer.disconnect();
    safe(traverseNode, "URL变化遍历")(document.body);
    safe(transTitle, "标题翻译")();
    safe(transBySelector, "选择器翻译")();
    setupMutationObserver();
  }

  /* ========================================================================
   *  页面类型检测
   * ======================================================================== */
  function detectPageType() {
    const pathname = window.location.pathname;
    for (const [type, pattern] of CONFIG.PAGE_PATTERNS) {
      if (pattern.test(pathname)) {
        if (type === "profile") {
          const known = new Set([
            "models",
            "datasets",
            "spaces",
            "docs",
            "blog",
            "posts",
            "papers",
            "chat",
            "tasks",
            "pricing",
            "enterprise",
            "login",
            "signup",
            "settings",
            "new",
            "organizations",
            "about",
            "terms",
            "privacy",
            "brand",
            "feedback",
            "security",
            "press",
            "jobs",
            "contact",
          ]);
          const segment = pathname.replace(/^\//, "").replace(/\/$/, "");
          if (known.has(segment)) return "public";
        }
        return type;
      }
    }
    return "public";
  }

  function updatePageConfig(trigger) {
    const newType = detectPageType();
    if (!newType) {
      State.pageConfig = null;
      return;
    }
    if (newType !== State.pageConfig?.currentPageType) {
      State.pageConfig = buildPageConfig(newType);
      console.log(`[HF 汉化] ${trigger}: 页面类型 = ${newType}`);
    }
  }

  function buildPageConfig(pageType) {
    const lang = I18N[CONFIG.LANG];
    const page = lang[pageType] || {};
    return {
      currentPageType: pageType,
      staticDict: { ...(lang.public?.static || {}), ...(page.static || {}) },
      regexpRules: [...(page.regexp || []), ...(lang.public?.regexp || [])],
      transSelectors: [...(lang.public?.selector || []), ...(page.selector || [])],
      ignoreSelectors: [
        ...(I18N.conf?.ignoreSelectors?.["*"] || []),
        ...(I18N.conf?.ignoreSelectors?.[pageType] || []),
      ].join(", "),
      titleStatic: { ...(lang.public?.title?.static || {}), ...(page.title?.static || {}) },
      titleRegexp: [...(page.title?.regexp || []), ...(lang.public?.title?.regexp || [])],
      characterData: I18N.conf?.characterDataPages?.includes(pageType) || false,
    };
  }

  /* ========================================================================
   *  MutationObserver
   * ======================================================================== */
  function setupMutationObserver() {
    if (State.observer) State.observer.disconnect();
    State.observer = new MutationObserver(
      safe((mutations) => {
        const cur = window.location.href;
        if (cur !== _lastURL) {
          _lastURL = cur;
          State.currentURL = cur;
          updatePageConfig("MO");
        }
        if (State.pageConfig) processMutations(mutations);
      }, "MutationObserver"),
    );
    State.observer.observe(document.body, CONFIG.OBSERVER_CONFIG);
  }

  function processMutations(mutations) {
    const targets = new Set();
    for (const { target, addedNodes, type } of mutations) {
      if (type === "childList" && addedNodes.length > 0) {
        for (const node of addedNodes) {
          const parent = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
          if (parent && !parent.closest?.(State.pageConfig.ignoreSelectors)) targets.add(node);
        }
      } else if (type === "attributes") {
        if (target && !target.closest?.(State.pageConfig.ignoreSelectors)) targets.add(target);
      } else if (type === "characterData" && State.pageConfig.characterData) {
        const parent = target?.parentElement;
        if (parent && !parent.closest?.(State.pageConfig.ignoreSelectors)) targets.add(target);
      }
    }
    const topNodes = [];
    for (const node of targets) {
      let ancestor = node.parentElement,
        hasAncestor = false;
      while (ancestor) {
        if (targets.has(ancestor)) {
          hasAncestor = true;
          break;
        }
        ancestor = ancestor.parentElement;
      }
      if (!hasAncestor) topNodes.push(node);
    }
    for (const node of topNodes) traverseNode(node);
  }

  /* ========================================================================
   *  DOM 遍历
   * ======================================================================== */
  function traverseNode(root) {
    if (root.nodeType === Node.TEXT_NODE) {
      handleTextNode(root);
      return;
    }
    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
      (node) => {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          State.pageConfig.ignoreSelectors &&
          node.matches(State.pageConfig.ignoreSelectors)
        )
          return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    );
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeType === Node.ELEMENT_NODE) handleElementNode(node);
      else if (node.nodeType === Node.TEXT_NODE) handleTextNode(node);
    }
  }

  function handleTextNode(node) {
    if (node.length > 500) return;
    const result = transText(node.textContent);
    if (result) node.textContent = result;
  }

  function handleElementNode(node) {
    const tag = node.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") {
      if (["button", "submit", "reset"].includes(node.type)) transElementAttr(node, "value");
      else transElementAttr(node, "placeholder");
      return;
    }
    if (tag === "BUTTON") {
      transElementAttr(node, "title");
      transElementAttr(node.dataset, "confirmText");
      return;
    }
    if (tag === "A" || tag === "SPAN") transElementAttr(node, "title");
    if (node.hasAttribute("aria-label")) transElementAttr(node, "aria-label");
  }

  /* ========================================================================
   *  翻译
   * ======================================================================== */
  function transText(text) {
    if (!text || typeof text !== "string") return false;
    if (/^[\s0-9]*$/.test(text) || /^[一-龥　-〿＀-￯]+$/.test(text) || !/[a-zA-Z]/.test(text))
      return false;
    const trimmed = text.trim();
    const cleaned = trimmed.replace(/[\s\xa0]+/g, " ");
    const result = fetchTransResult(cleaned);
    if (result && result !== cleaned) return text.replace(trimmed, result);
    return false;
  }

  function fetchTransResult(text) {
    if (!State.pageConfig) {
      console.log("[HF] 无pageConfig");
      return false;
    }
    const staticHit = State.pageConfig.staticDict[text];
    if (typeof staticHit === "string") return staticHit;
    if (State.features.enableRegExp) {
      for (const [pattern, replacement] of State.pageConfig.regexpRules) {
        const result = text.replace(pattern, replacement);
        if (result !== text) return result;
      }
    }
    return false;
  }

  function transElementAttr(target, attr) {
    if (!State.features.enableTransAttr) return;
    const text = target[attr];
    if (!text) return;
    const result = transText(text);
    if (result) target[attr] = result;
  }

  function transBySelector() {
    if (!State.pageConfig?.transSelectors) return;
    for (const [selector, result] of State.pageConfig.transSelectors) {
      try {
        const el = document.querySelector(selector);
        if (el && el.textContent !== result) el.textContent = result;
      } catch (_) {}
    }
  }

  function transTitle() {
    if (!State.pageConfig) return;
    const title = document.title;
    const staticHit = State.pageConfig.titleStatic[title];
    if (staticHit) {
      document.title = staticHit;
      return;
    }
    if (State.features.enableRegExp) {
      for (const [pattern, replacement] of State.pageConfig.titleRegexp) {
        const result = title.replace(pattern, replacement);
        if (result !== title) {
          document.title = result;
          return;
        }
      }
    }
  }

  /* ========================================================================
   *  启动
   * ======================================================================== */
  init();
})(window, document);
