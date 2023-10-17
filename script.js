const btn = document.querySelector('.talk')
const content = document.querySelector('.content')


function speak(text){
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    var day = new Date();
    var hour = day.getHours();

    if(hour>=0 && hour<12){
        speak("Good morning")
    }

    else if(hour<20 && hour<17){
        speak("Good Afternoon")
    }

    else{
        speak("Good evening")
    }
}

window.addEventListener('load', ()=>{
    speak("Voice assistant is starting..");
    wishMe();
   
})

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onresult = (event)=>{
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    const textContent = transcript;
    takeCommand(textContent.toLowerCase());

}


btn.addEventListener('click', ()=>{
    content.textContent = "Listening..."
    recognition.start();
})


function takeCommand(message){
    if(message.includes('hey') || message.includes('hello')){
        speak("hello sir, How May I help you?");
    }
    if(message.includes('open google')){
        window.open("https://google.com", "_blank");
        speak("Openning Google..")
    }
    if(message.includes('open facebook')){
        window.open("https://facebook.com", "_blank");
        speak("Openning facebook..")
    }
    if(message.includes('open youtube')){
        window.open("https://youtube.com", "_blank");
        speak("Openning youtube..")
    }
    else if(message.includes('what is') || message.includes('who is') || message.includes('what are') || message.includes('who are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what i found on internet regarding " + message;
	    speak(finalText);
  
    }
    else if(message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speak(finalText);
    }

    else if(message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = time;
        speak(finalText);
    }

    else if(message.includes('date')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"})
        const finalText = date;
        speak(finalText);
    }
     
}