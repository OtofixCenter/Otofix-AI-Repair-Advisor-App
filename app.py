import streamlit as st
import google.generativeai as genai
import os

# Fetching the Google Gemini API key from Streamlit Secrets (environment variables).
# Make sure to define this key as 'GOOGLE_API_KEY' in Streamlit Cloud Secrets.
api_key = os.environ.get("GOOGLE_API_KEY")

# If the API key is not found, display an error message to the user and stop the app.
if not api_key:
    st.error("API Key not found. Please set the 'GOOGLE_API_KEY' environment variable in Streamlit Secrets.")
    st.stop() # Prevents the application from proceeding further.
else:
    # If the API key is found, configure the Gemini model.
    genai.configure(api_key=api_key)

# Specifying the Gemini model to be used.
# Using 'gemini-1.5-flash-latest' which is more current and compatible with generateContent.
# 'gemini-1.5-flash-latest' is a good choice for quick responses.
model = genai.GenerativeModel('gemini-1.5-flash-latest')

# Configuring Streamlit page settings.
st.set_page_config(page_title="Otofix AI Assistant", page_icon=":wrench:", layout="centered")

# Application title and brief description.
st.title("🔧 Otofix AI Assistant")
st.markdown("Ask the AI about your car issues or part-related questions.")

# Text area for the user's question.
user_question = st.text_area("Enter your question here:", height=100)

# "Submit Question" button.
if st.button("Submit Question"):
    if user_question:
        # Show a spinner while generating the response.
        with st.spinner("Generating response..."):
            try:
                # Get response from the Gemini model.
                response = model.generate_content(user_question)
                st.subheader("AI Response:")
                st.write(response.text)
            except Exception as e:
                # If an error occurs, display the error message.
                st.error(f"An error occurred: {e}")
    else:
        # If the user doesn't enter a question, show a warning.
        st.warning("Please enter a question.")

# Usage instructions for the sidebar.
st.sidebar.markdown("""
### How to Use
1.  Type your question about your vehicle.
2.  Click the "Submit Question" button.
3.  The AI assistant will provide you with a response!
""")
