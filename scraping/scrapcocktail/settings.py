# -*- coding: utf-8 -*-

# Scrapy settings for tutorial project
#
# For simplicity, this file contains only the most important settings by
# default. All the other settings are documented here:
#
#     http://doc.scrapy.org/en/latest/topics/settings.html
#

BOT_NAME = 'scrapcocktail'

SPIDER_MODULES = ['scrapcocktail.spiders']
NEWSPIDER_MODULE = 'scrapcocktail.spiders'
ITEM_PIPELINES = ['scrapcocktail.pipelines.JsonWithEncodingPipeline']
CONCURRENT_REQUESTS = 1000

# Crawl responsibly by identifying yourself (and your website) on the user-agent
#USER_AGENT = 'tutorial (+http://www.yourdomain.com)'
