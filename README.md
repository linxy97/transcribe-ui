## Transcribe UI

Transcribe UI is an open source UI built using NextJS and React. In the backend it calls Whisper AI.

The project uses NextJS 13 App Router.


### Demo
[Web](https://izzy-transcribe.vercel.app/)

![demo](https://github.com/linxy97/transcribe-ui/blob/main/public/demo.jpg?raw=true)

## Deploy with Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/linxy97/transcribe-ui)

Remember to set environment variable for OpenAI
```sh
OPENAI_API_KEY=YOUR_KEY
```

## Installation and Usage
To use this application, follow the steps below:

1. Clone the Github repository to your local machine
2. Next, navigate to the project directory by running:
```sh
cd transcription-ui
```
3. Run the command `npm install` to install all necessary dependencies required to run the application.
4. Create an `.env.local` file at the root directory and set your OpenAI API key like this:
```sh
OPENAI_API_KEY=YOUR_KEY
```
5. Once you have set up your `.env.local` file, run `npm run dev` to start the application.
6. Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

That's it! You can now transcribe!

## Contact

Feel free to reach out to @linxy on [Twitter](https://twitter.com/Linxy07456272)
