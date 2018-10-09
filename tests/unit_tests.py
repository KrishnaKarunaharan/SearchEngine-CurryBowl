import os,sys,inspect
currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0,parentdir)

from crawler import crawler
tests = []


def testInvertedIndex():
    bot = crawler(None, "test_urls.txt")
    bot.crawl(depth=0)
    resolved = bot.get_resolved_inverted_index()
    print resolved
    if len(resolved['common']) != 2:
        return False
    if len(resolved['word1']) != 1 and "http://localhost:8080/1" not in resolved['word1']:
        return False
    if len(resolved['word2']) != 1 and "http://localhost:8080/2" not in resolved['word2']:
        return False

    return True

tests.append(testInvertedIndex)


def main():
    for test in tests:
        if not test():
            print "TEST",test.__name__,"FAILED"
            return
    print "TESTS PASSED"

if __name__== "__main__":
    main()
