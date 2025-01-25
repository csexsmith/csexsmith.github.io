import feedparser
import schedule
import time
from telegram import Bot
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time
from selenium.webdriver.chrome.service import Service
#bot_api_token = '7733263280:AAGx0oUx8FdlrBJyRfbWIYgX11-zsxeA8F4'
#chat_id = -1002487717706
rss_feeds = [
    ["Decrypt", "https://decrypt.co/feed/rss"],
    ["NewsBTC", "https://www.newsbtc.com/feed/"],
    ["DailyCoin", "https://dailycoin.com/feed/"],
    ["CCN", "https://www.ccn.com/news/crypto-news/feeds/"],
    ["CoinTelegraph", "https://cointelegraph.com/rss"],
    ["CoinSpeaker", "https://feeds.feedburner.com/coinspeaker"],
    ["CoinCodex", "https://coincodex.com/rss"],
    ["Blockchain.News", "https://blockchain.news/RSS/"],
    ["CoinJournal", "https://coinjournal.net/feeds/"],
    ["Bitcoin.com", "https://news.bitcoin.com/feed/"],
    ["Bitcoin Magazine", "https://bitcoinmagazine.com/.rss/full/"],
    ["Crypto Potato", "https://cryptopotato.com/feed/"],
    ["Altcoin Buzz", "https://www.altcoinbuzz.io/feed/"],
    ["Crypto Ninjas", "https://www.cryptoninjas.net/feed/"],
    ["CoinCu", "https://coincu.com/feed/"],
    ["DailyHodl", "https://dailyhodl.com/feed/"],
    ["Messari.io", "https://messari.io/rss"],
    ["The Defiant", "https://thedefiant.io/api/feed"],
    ["UToday", "https://u.today/rss"],
    ["AMBCrypto", "https://eng.ambcrypto.com/feed/"],
    ["Blockworks", "https://blockworks.co/feed"],
    ["CryptoSlate", "https://cryptoslate.com/feed/"],
    ["CoinGape", "https://coingape.com/feed/"],
    ["Fortune (Crypto Section)", "https://fortune.com/feed/fortune-feeds/?id=3230629"],
    ["CoinDesk", "https://www.coindesk.com/arc/outboundfeeds/rss/"],
    ["Crypto News Flash", "https://www.crypto-news-flash.com/feed/"],
    ["Blockonomi", "https://blockonomi.com/feed/"],
    ["Crypto Briefing", "https://cryptobriefing.com/feed/"]
]
keywords = [
    # Market Movement
    "All-time high", "Price surge", "Bull run", "Market rally", "Price crash",
    "Bear market", "Volatility", "Correction", "Pump", "Dump", "Breakout",
    "Sell-off", "Resistance level", "Support level", "Volume spike",

    # Regulatory News
    "SEC", "CFTC", "Regulation", "Ban", "Approval", "Filing", "Compliance",
    "Lawsuit", "Crackdown", "Sanctions", "Framework", "Policy", "Legalization",
    "License", "KYC", "AML", "Oversight",

    # Adoption and Partnerships
    "Adoption", "Integration", "Partnership", "Collaboration", 
    "Institutional investment", "Mainstream", "Merchant acceptance", "Utility",
    "Use case", "Corporate adoption", "Cross-border payments",

    # Technical Developments
    "Upgrade", "Fork", "Merge", "Layer 2", "Mainnet launch", "Testnet", "EIP",
    "Smart contracts", "Decentralization", "Staking", "Tokenomics", 
    "Scalability", "Throughput", "Interoperability",

    # New Coins and Tokenomics
    "IDO", "ICO", "Token burn", "Airdrop", "Hard cap", "Supply",
    "Circulating supply", "Market cap", "Whale activity",

    # Institutional Interest
    "ETF", "Hedge fund", "Institutional demand", "Custody", "Fidelity",
    "Grayscale", "BlackRock", "Wall Street",

    # Macroeconomic Factors
    "Interest rates", "Inflation", "Recession", "Federal Reserve", "Jobs report",
    "Oil prices", "Geopolitical tension", "Sanctions", "Global market", 
    "Debt ceiling",

    # Security and Hacks
    "Hack", "Exploit", "Vulnerability", "Scam", "Rug pull", "Phishing", 
    "Security breach", "Compromise", "Stolen funds", "Malware", "Bug bounty",

    # Social Sentiment
    "Trending", "Viral", "Community", "Sentiment", "Fear and greed index", 
    "Twitter mentions", "Reddit posts",

    # Notable Individuals and Influencers
    "Elon Musk", "Michael Saylor", "Vitalik Buterin", "Satoshi Nakamoto", 
    "CZ", "Justin Sun", "Jack Dorsey", "Cathie Wood", "Trump",

    # Exchange News
    "Listing", "Delisting", "Binance", "Coinbase", "Kraken", "Bitfinex", 
    "FTX", "Liquidity", "Trading pairs", "Volume",

    # Ecosystem Growth
    "DeFi", "NFT", "Metaverse", "GameFi", "Web3", "DAO", "Yield farming", 
    "Liquidity mining",

    # Government and International News
    "CBDC", "Central bank", "Fiat", "Reserve currency", "Government initiative", 
    "Adoption by country", "Legal tender", "El Salvador", "BRICS"
]

positive_words = [
    # General Keywords
    "banking", "regulatory clarity", "institutional investment", "favorable legal decision", 
    "success", "wealth fund", "major endorsement", "win", "adoption", 
    "payment processor", "bank partnership", "ETF announcement", "network upgrade", 
    "investment", "innovation", "release", "support", "integration", 
    "institutional", "mass retail", "favorable rulings", "major exchange listing",

    # Exchange Listing Phrases
    "to be listed on", "announces listing of", "gains exchange listing on", 
    "Trading for [A] opens on [B]",

    # Partnership Announcement Phrases
    "partners with", "announces partnership with", "join forces", 
    "teams up with", "collaborate on", "[B] to integrate [A]'s technology", 
    "seamless payments", "[A] to enable purchases through [B]", 
    "[A] adds [B] to its supported assets"
]

negative_words = [

    "legal investigation", "SEC cases", "SEC charges", "hacking", "breach reports", 
    "service suspension", "regulatory crackdown", "controversy", "market manipulation", 
    "price manipulation", "bankruptcy", "lawsuit", "regulatory uncertainty", 
    "government intervention", "network pause", "hack", "sell-off", "downgrade", 
    "withdrawal", "fraud", "liquidation", "outage", "security breach", "ban", 
    "restriction", "loss of partnership", "downturn", "scandal", "missed deadlines", 
    "scheduled delisting",

    # Delisting Phrases
    "to delist", "delisted from", "removes", "Trading for [A] to end on [B]", 
    "announces delistment",

    # SEC Lawsuit Phrases
    "SEC files charges", "accused of securities violations by SEC", "SEC sues", 
    "faces SEC lawsuit", "hit with SEC lawsuit", "sued by SEC", "SEC targets lawsuit", 
    "SEC probes", "investigates", "cracks down", "Judge rules", "court rules", 
    "landmark decision"
]

latest_articles = {}

import re
def escape_markdown(text):
    reserved_chars = r"_*[]()~`>#+-=|{}.!"
    return re.sub(r"([%s])" % re.escape(reserved_chars), r"\\\1", text)
import psycopg2
from psycopg2 import sql

def send_to_postgres(source, title, link, sentiment, negative_words, positive_words, ai_sentiment):
    db_params = {
        'dbname': 'your_database',
        'user': 'your_user',
        'password': 'your_password',
        'host': 'localhost',
        'port': 5432
    }
    
    table_name = "sentiment_analysis"
    columns = ["source", "title", "link", "sentiment", "negative_words", "positive_words", "ai_sentiment"]
    
    try:
        connection = psycopg2.connect(**db_params)
        cursor = connection.cursor()

        insert_query = sql.SQL("""
            INSERT INTO {table} ({fields}) 
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """).format(
            table=sql.Identifier(table_name),
            fields=sql.SQL(', ').join(map(sql.Identifier, columns))
        )
        data = (
            source,
            title,
            link,
            sentiment,
            ', '.join(negative_words),
            ', '.join(positive_words),
            ai_sentiment
        )
        
        cursor.execute(insert_query, data)

        connection.commit()
        print("Data inserted successfully into PostgreSQL table.")
    
    except psycopg2.Error as e:
        print(f"Error inserting data into PostgreSQL: {e}")
    
    finally:
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection closed.")

def send_to_telegram(source, title, link, sentiment, negative_words, positive_words, ai_sentiment):
    url = f"https://api.telegram.org/bot{bot_api_token}/sendMessage"
    source = escape_markdown(source)
    title = escape_markdown(title)
    link = escape_markdown(link)
    if sentiment == "Positive and Negative items are both present":
        message = (
            f"*{title}*\n\n"
            f"{source} : {link}\n\n"
            f"AI Sentiment: {ai_sentiment}\n"
            f"Keyword Sentiment: {sentiment}\n\n"
            f"Positive Indicators: {', '.join(positive_words)}\n\n"
            f"Negative Indicators: {', '.join(negative_words)}"
        )
    elif sentiment == "Resoundingly Negative" or sentiment == "Negative":
        message = (
            f"*{title}*\n\n"
            f"{source} : {link}\n"
            f"AI Sentiment: {ai_sentiment}\n"
            f"Keyword Sentiment: {sentiment}\n\n"
            f"Negative Indicators: {', '.join(negative_words)}"
        )
    elif sentiment == "Resoundingly Positive" or sentiment == "Positive":
        message = (
            f"*{title}*\n\n"
            f"{source} : {link}\n"
            f"AI Sentiment: {ai_sentiment}\n"
            f"Keyword Sentiment: {sentiment}\n\n"
            f"Negative Indicators: {', '.join(positive_words)}"
        )
    else:
        message = (
            f"*{title}*\n\n"
            f"{source} : {link}\n"
            f"AI Sentiment: {ai_sentiment}\n"
            f"Sentiment: {sentiment}"
        )
    payload = {
        "chat_id": chat_id,
        "text": message,
        "parse_mode": "MarkdownV2"
    }
    response = requests.post(url, json=payload)
    if response.status_code == 200:
        print("Message sent successfully!")
        #NEED TO GO IN AND ERASE THE FIRST ITEMS OF THE FILE EVERY 24 HOURS OR SOMETHING
        filepath = 'C:/Users/Carter Sexsmith/Documents/website/csexsmith.github.io/aiWebsite/src/out.txt'
        with open(filepath, 'a') as f:
            f.write(ai_sentiment + ',' + sentiment)
    else:
        print(f"Failed to send message: {response.text}")

#classifier1 = joblib.load(r"C:\Users\jamma\OneDrive\Desktop\Marketing Scripts\tweet_classifier.pkl")
#vectorizer1 = joblib.load(r"C:\Users\jamma\OneDrive\Desktop\Marketing Scripts\tweet_vectorizer.pkl")
def is_article_relevant(title):
    keyword_val = 0
    for keyword in keywords:
        if keyword.lower() in title.lower():
            keyword_val = 1
            break
    title_vectors = vectorizer1.transform([title])
    predictions = classifier1.predict(title_vectors)
    predicted_class = predictions[0]
    if predicted_class == 1 and keyword_val == 1:
        return True
    return False

import requests
from bs4 import BeautifulSoup
import joblib
#classifier = joblib.load(r"C:\Users\jamma\OneDrive\Desktop\Marketing Scripts\tweet_classifier.pkl")
#vectorizer = joblib.load(r"C:\Users\jamma\OneDrive\Desktop\Marketing Scripts\tweet_vectorizer.pkl")
def fetch_feed_updates():
    global latest_articles
    for source, url in rss_feeds:
        try:
            print(f"Checking feed: {source}")
            feed = feedparser.parse(url)
        except:
            pass
            
        if not feed.entries:
            print(f"No entries found for {source}.")
            continue
        latest_entry = feed.entries[0]
        latest_title = latest_entry.title
        latest_link = latest_entry.link
        if source not in latest_articles or latest_articles[source] != latest_title:
            if is_article_relevant(latest_title):
                sentiment = 'unknown'
                ai_sentiment = 'unknown'
                response = requests.head(latest_link)
                if response.status_code == 200:
                    response = requests.get(latest_link)
                    soup = BeautifulSoup(response.text, 'html.parser')
                    page_text = soup.get_text(separator=" ", strip=True).lower()
                    matched_positive_keywords = [word for word in positive_words if word.lower() in page_text]
                    matched_negative_keywords = [word for word in negative_words if word.lower() in page_text]
                    title_vectors = vectorizer.transform([latest_title])
                    predictions = classifier.predict(title_vectors)
                    predicted_class = predictions[0]
                    if predicted_class == 1:
                        ai_sentiment = 'Positive'
                    elif predicted_class == 0:
                        ai_sentiment = 'Negative'
                    if matched_negative_keywords != []:
                        if len(matched_negative_keywords) >= 3:
                            sentiment = 'Resoundingly Negative'
                        else:
                            sentiment = 'Negative'
                    if matched_negative_keywords != []:
                        if len(matched_negative_keywords) >= 3:
                            sentiment = 'Resoundingly Positive'
                        else:
                            sentiment = 'Positive'
                    if matched_negative_keywords != [] and matched_positive_keywords != []:
                        sentiment = 'Positive and Negative items are both present'
                else:
                    try:
                        #
                        #
                        #
                        #NEED TO CHANGE THE PATH HERE
                        #
                        #
                        #
                        driver_path = 'C:/webDrivers/chromedriver-win64/chromedriver.exe'
                        chrome_service = Service(driver_path)
                        chrome_options = Options()
                        chrome_options.add_argument("--headless")
                        driver = webdriver.Chrome(service=chrome_service, options=chrome_options)
                        driver.get(latest_link)
                        time.sleep(15) 
                        html_content = driver.page_source
                        soup = BeautifulSoup(html_content, 'html.parser')  
                        page_text = soup.get_text(separator=" ", strip=True).lower()
                        matched_positive_keywords = [word for word in positive_words if word.lower() in page_text]
                        matched_negative_keywords = [word for word in negative_words if word.lower() in page_text]
                        main_content = ""
                        body = soup.find('body')
                        if body:
                            for tag in body(['script', 'style', 'nav', 'footer', 'aside']):
                                tag.decompose()
                            main_sections = body.find_all(['header', 'main', 'article', 'section'])
                            if main_sections:
                                main_content = " ".join(section.get_text(separator=" ", strip=True) for section in main_sections)
                            else:
                                main_content = body.get_text(separator=" ", strip=True)
                        main_content_lower = main_content.lower()
                        matched_positive_keywords = [word for word in positive_words if word.lower() in main_content_lower]
                        matched_negative_keywords = [word for word in negative_words if word.lower() in main_content_lower]
                        title_vectors = vectorizer.transform([latest_title])
                        predictions = classifier.predict(title_vectors)
                        predicted_class = predictions[0]
                        if predicted_class == 1:
                            ai_sentiment = 'Positive'
                        elif predicted_class == 0:
                            ai_sentiment = 'Negative'
                        if matched_negative_keywords != []:
                            if len(matched_negative_keywords) >= 3:
                                sentiment = 'Resoundingly Negative'
                            else:
                                sentiment = 'Negative'
                        if matched_negative_keywords != []:
                            if len(matched_negative_keywords) >= 3:
                                sentiment = 'Resoundingly Positive'
                            else:
                                sentiment = 'Positive'
                        if matched_negative_keywords != [] and matched_positive_keywords != []:
                            sentiment = 'Positive and Negative items are both present'
                        driver.close()
                    except:
                        pass
                #send_to_telegram(source, latest_title, latest_link, sentiment, matched_negative_keywords, matched_positive_keywords, ai_sentiment)
                send_to_postgres(source, latest_title, latest_link, sentiment, negative_words, positive_words, ai_sentiment)
                print(f"New article from {source}: {latest_title}")
                print(f"Link: {latest_link}")
                print(f"Sentiment: {sentiment}")
                latest_articles[source] = latest_title
        else:
            print(f"No new articles from {source}.")

if __name__ == "__main__":
    print("Starting RSS feed checker...")
    while True:
        fetch_feed_updates()
        time.sleep(60)