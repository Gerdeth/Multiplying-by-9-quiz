(function(){
    var questions =[{
        question: "2*9=",
        choices:[2,7,11,18],
        correctAnswer:18
    },{
        question: "What is 8*9?",
        choices: [72, 99, 108, 134, 156],
        correctAnswer: 72
    },{
        question: "What is the product of 6 and 9?",
        choices: [12, 19, 54, 134, 146],
        correctAnswer: 54
    },{
        question: "What is 17 multiplied by 9?",
        choices: [26, 108, 134, 153,963],
        correctAnswer: 153
    },{
        question: "What is 149*9?",
        choices: [ 158, 1341,1091, 1561],
        correctAnswer: 1341
    }
    ]})

    var questionCounter = 0; // Tracks question number
    var selections =[]; //Contains user choices
    var quiz = $('#quiz'); //quiz div object

    displayNext(); //Display initial question
   
  $('#next').on('click', function (e) {
    e.preventDefault();  // Click handler for the 'next' button
    
    
    if(quiz.is(':animated')) {        
      return false;
    }
    choose(); // Suspend click listener during fade animation
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

    function displayNext(){
        quiz.fadeOut(function(){
            $('#question').remove();

            if(questionCounter<questions.length){
                var nextQuestion= createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();
                if (!(isNaN(selections[questionCounter]))){
                    $('input[value='+selections[questionCounter]+']').prop('checked',true);
                }
            }
        })
    }