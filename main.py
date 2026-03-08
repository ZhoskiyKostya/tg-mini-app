import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes
from dotenv import load_dotenv
import os

# Enable logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Your bot token from @BotFather
BOT_TOKEN = os.getenv("TOKEN")
# Your Mini App URL (where you host the HTML)
MINI_APP_URL = "https://your-domain.com"  # Replace with your actual URL


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Send a message with a button that opens the mini app."""
    keyboard = [
        [InlineKeyboardButton("🚀 Open Mini App", web_app={"url": MINI_APP_URL})],
        [InlineKeyboardButton("ℹ️ About", callback_data='about')]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    await update.message.reply_text(
        "Welcome to My Telegram Mini App! 🎮\n\n"
        "Click the button below to open the mini app:",
        reply_markup=reply_markup
    )


async def about(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Send information about the mini app."""
    query = update.callback_query
    await query.answer()

    await query.edit_message_text(
        "📱 About This Mini App\n\n"
        "This is a simple example of a Telegram Mini App.\n"
        "Features:\n"
        "• User info display\n"
        "• Interactive counter\n"
        "• Native UI components\n"
        "• Theme support\n"
        "• Cloud storage\n\n"
        "Built with ❤️ using Python and JavaScript"
    )


async def button_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle button callbacks."""
    query = update.callback_query
    await query.answer()

    if query.data == 'about':
        await about(update, context)


def main():
    """Start the bot."""
    # Create application
    application = Application.builder().token(BOT_TOKEN).build()

    # Add handlers
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CallbackQueryHandler(button_callback))

    # Start bot
    print("Bot started! Press Ctrl+C to stop.")
    application.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == '__main__':
    main()