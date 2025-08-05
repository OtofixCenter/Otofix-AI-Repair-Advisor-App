import streamlit as st
import google.generativeai as genai
import os

# Get the API key from environment variables
api_key = os.environ.get("GOOGLE_API_KEY")

if not api_key:
    st.error("API Key not found. Please set the GOOGLE_API_KEY environment variable in Vercel.")
    st.stop()
else:
    genai.configure(api_key=api_key)

model = genai.GenerativeModel('gemini-pro')

st.set_page_config(page_title="Otofix AI Assistant", page_icon=":wrench:")

st.title("🔧 Otofix AI Assistant")
st.markdown("Ask the AI about your car issues or part-related questions.")

# Text input for the user's question
user_question = st.text_area("Enter your question here:", height=100)

if st.button("Submit Question"):
    if user_question:
        with st.spinner("Generating response..."):
            try:
                # Get a response from the Gemini model
                response = model.generate_content(user_question)
                st.subheader("AI Response:")
                st.write(response.text)
            except Exception as e:
                st.error(f"An error occurred: {e}")
    else:
        st.warning("Please enter a question.")

st.sidebar.markdown("""
### How to Use
1.  Type your question about your vehicle.
2.  Click the "Submit Question" button.
3.  The AI assistant will provide you with a response!
""")
