

const renderScreen = (screenName) => {
    const mainScreen = document.getElementById("main-screen")
    const screenOrder = ["Playground", "Tests", "Dictionary", "About Us"]
    mainScreen.style.transform = `translateX(-${screenOrder.indexOf(screenName) * 20}%)`
}
renderScreen("Tests")


let currentPlayground
const showPlayground = (playgroundName) => {
    if (playgroundName === "rl-playground") {
        window.open("https://alazareva.github.io/rl_playground/","_blank");
        return
    }
    if (playgroundName === "wireshark") {
        window.open("https://www.wireshark.org/#downloadLink","_blank")
        return
    }
    document.getElementById("playground").style.transform = "translateY(-50%)"
    if (currentPlayground) {
        document.getElementById(currentPlayground).style.opacity = "0"
        document.getElementById(currentPlayground).style.zIndex = "0"
    }
    currentPlayground = playgroundName
    document.getElementById(currentPlayground).style.opacity = "1"
    document.getElementById(currentPlayground).style.zIndex = "1"
    let notes = {
        "hardware-model": `This is a model including most of the important hardware components of a computer. Just hover over any buttons.<br><br>While looking like a 3D model, this is actually a 2D model that's made in <b>Rive</b>, a web/application tool used by Duolingo. Yes, everysingle thing you see in this model had to be carefully drawn with vertices, all the parralelograms and whatnot (That's why we didn't bother with the fans lmao @v@). In the end, the whole thing took 2 people a total of 8 hours to model - 3-4 hours of which was poured into the motherboard alone - and an extra 3 hours to animate.<br><br>Well, due to limitted time, this model wasn't able to cover everything that you'd see on a computer these days, like a cooling unit or I/O devices (which are really annoying to model). Nevertheless, this should give you a good idea on what basic computer hardwares do.
        <br><br>Our tip: go deeper into it! There are so many things to discover in the world of hardware!<br><br>
        Also, this is <a href="https://rive.app/community/files/14620-27590-computer-model" style="color:cyan;">our Rive file</a> if you want to learn how this was made.`,
        "altair-8800": `
            Spoiler alert: you will actually have no idea how this machine work at all.<br>
            <br>
            The Altair 8800 was developed by MITS in 1975 based on the Intel 8080 microprocessor. It was simple by today's standards, consisting of a box with switches for input and lights for output. Its release sparked the personal computer revolution and attracted the attention of Bill Gates and Paul Allen, who developed the first version of Microsoft BASIC. So in another way, the Altair 8800 is credited with igniting the modern personal computing era.<br>
            <br>
            As simple as the design is, inputting instructions into this machine is a whole different story. You'll have to use quite literally the lowest level of "Programming language" - binary numbers.<br>
            <br>
            To summarize it, if you look at the A0-A15, that's going to be the memory address that's being examined, and D0-D7 line displays the value of that memory address. Both of these are displayed in binary.<br>
            <br>
            If you look at the "Ref" tab in the simulator, you'll also see the instructions it takes just to calculate 1+2. Yeah, you'll actually need to flick like 100 switches just to calculate 1+2. And if you ever flick any one of them wrong, you'll have to start all over again.<br>
            <br>
            Looking at this computer, it's quite incredible how much technology has changed in just the past 50 years. Now, computer calculations have been made not only simpler and more understandable, it's also more accessible for everyone through all the programming language courses online. But nevertheless, the Altair 8800 was a legend, is a legend, and always has been a legend in the history of hardware.<br>
        `,
        "eliza": `
            ELIZA is the first ever language processing program ever created by humanity. It was developed between 1964 and 1967 in MIT by Joseph Weizenbaum. <br>
            <br>
            ELIZA takes character as a Rogerian psychotherapist that helps the user in their time of distress and so on. This program was also one of the first programs that could qualify for the Turing Test!<br>
            <br>
            While people back then was easily convinced that ELIZA can understand the text that the user sends, the creator, Joseph, insisted the opposite. And it's for good reason as well.<br>
            <br>
            If you look at <span onclick="window.open('Playgrounds/eliza/source.txt')" style="color:cyan; cursor:pointer;">the source code</span>, you can see that the whole thing is just looking for a certain values of keywords provided by the user, converting them into values, and them printing out a prewritten response. Or in other words, as an early Symbolic AI program, ELIZA was just a bunch of if else statements, without any understanding of human text or emotions.<br>
            <br>
            Another interesting I found: Every time you input something into ELIZA, there would be a small delay before she responds. 
            This is not actually ELIZA calculating what response she should pick. She's actually hardcoded to wait for 1-4 seconds 
            in order to create an illusion that she's actually thinking like a human. Nice try, Weizenbaum.<br>
            <br>
            In code:<br>
            <span style="font-style:italic;font-size:12px;">setTimeout("think()", 1000 + Math.random()*3000);</span><br>
            <br>
            Nowadays, people have invented multiple other chatbots that we still use to this day, such as Siri, Alexa and ChatGPT. But still, to think that the first ever chatbot was invented even before the first general purpose computer. It's fascinating.
        `
    }
    document.getElementById("playground-notes-body").innerHTML = notes[currentPlayground]
}

const backPlayground = () => {
    document.getElementById("playground").style.transform = "translateY(0%)"
}





