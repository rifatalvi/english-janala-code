// console.log("hi js learners");
const lessonsLoder = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data))

};
const removeActive =()=>{
    const removeActiveClass =document.querySelectorAll(".lessons");
    removeActiveClass.forEach(removes =>{
        // console.log(removes)
        removes.classList.remove("active");

    })
}

const wordCount=(id)=>{
   const url = `https://openapi.programming-hero.com/api/level/${id}`;
   fetch(url)
   .then((res) => res.json())
   .then((json)=> {
    removeActive();
    const button = document.getElementById(`lessons-no-${id}`);
    button.classList.add("active");
    displayWordCard(json.data);
   });
};
const wordDitails=async(id) =>{
    const url =`https://openapi.programming-hero.com/api/word/${id}`;
    const res =await fetch(url);
    const details = await res.json();
    displayWordDitails(details.data);
}
const displayWordDitails =(words)=>{
       const ditailBox = document.getElementById("detail-box");
       ditailBox.innerHTML = `
         <div id="detail-box" class="rounded-xl">
                    <div class="p-5 space-y-7">
                        <h2 class="font-bold text-3xl ">${words.word} ( <i class="fa-solid fa-microphone-lines"></i>: <span class="font-bangla">${words.pronunciation}</span> )</h2>
                        <div>
                            <p class="font-semibold text-xl mb-3">Meaning</p>
                            <p class="font-bangla font-semibold">${words.meaning}</p>
                        </div>
                        <div>
                            <h4 class="font-semibold text-xl mb-3">Example</h4>
                            <p class="opacity-70">${words.sentence}</p>
                        </div>
                        <div>
                            <p class="font-bangla mb-3 font-semibold">সমার্থক শব্দ গুলো</p>
                            <div class="flex gap-5">
                                <button class="btn bg-[#D7E4EF]">${words.synonyms[0]}</button>
                                <button class="btn bg-[#D7E4EF]">${words.synonyms[1]}</button>
                                <button class="btn bg-[#D7E4EF]">${words.synonyms[2]}</button>
                            </div>
                        </div>
                    </div>


       `;
       document.getElementById("word_middle").showModal();
}

const displayWordCard =(words) =>{
//   console.log(words);
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML ="";
  if(words.length == 0){
     wordContainer.innerHTML =`
     <div class="text-center mx-auto col-span-full py-10">
            <img src="./assets/alert-error.png" alt="" class="mx-auto mb-3">
            <p class="font-bangla mb-5 opacity-50">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bangla font-bold text-5xl">নেক্সট Lesson এ যান</h2>
          </div>
     `;

    return;
  }
  words.forEach((word)=> {
    const card = document.createElement("div");
    // console.log(word);
    card.innerHTML=`
      <div class="bg-white py-10 px-5 rounded-xl text-center">
                <h2 class="text-3xl font-semibold mb-4 ">${word.word? word.word:"no Word Found"}</h2>
                <p class="mb-5 font-medium">Meaning /Pronounciation</p>
                <div class="text-2xl font-bold font-bangla text-gray-600 mb-14">"${word.meaning?word.meaning:"অর্থ পাওয়া যাইনি" }/${word.pronunciation}"</div>
                <div class="flex justify-between items-center">
                   <button onclick="wordDitails(${word.id})" class="btn bg-slate-200 hover:bg-slate-400"><i class="fa-solid fa-circle-info"></i></button>
                   <button class="btn  bg-slate-200 hover:bg-slate-400"><i class="fa-solid fa-volume-high"></i></button>
                   
                </div>
    `;
    wordContainer.append(card);
  });

};

const displayLessons =(lessons) =>{
    // console.log(lessons);

    const lessonsContainer = document.getElementById("leasons-section");
    lessonsContainer.innerHTML ="";
    
    for(let lesson of lessons){
        // console.log(lesson);
        const  btnDiv = document.createElement("div");
        btnDiv.innerHTML =`
          <button id="lessons-no-${lesson.level_no}" onclick= "wordCount(${lesson.level_no})" class="btn lessons btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> lesson -${lesson.level_no}</button>
        `;
        lessonsContainer.appendChild(btnDiv);
    }
}

lessonsLoder();