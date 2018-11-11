from crawler import crawler
import os

bot = crawler(None, "urls.txt")
bot.crawl(depth=1)
pr = bot.get_page_rank()
print bot._resolved_doc_id
resolved_pr = {}
for url_id,score in pr.items():
    resolved_pr[bot._resolved_doc_id[url_id][0]]=score

sorted_pr = sorted(resolved_pr.items(), key=lambda x: -x[1])

max_len = len(max([tup[0] for tup in sorted_pr], key=len)) + 5
format_str = "{:<"+str(max_len)+"} {:<15}"


print "\n"
print format_str.format('URL','Score')

for url,score in sorted_pr:    
    print format_str.format(url,score)

print ""


if os.path.exists("currybowl.db"):
    os.remove("currybowl.db")


bot.flush("currybowl.db")


