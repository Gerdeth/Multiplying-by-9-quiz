(function(){
    var questions =[{
        question: "2*9 =",
        choices:[2,7,11,18],
        correctAnswer:18
    },{
        question: "What is 8*9 ?",
        choices: [72, 99, 108, 134, 156],
        correctAnswer: 72
    },{
        question: "What is the product of 6 and 9 ?",
        choices: [12, 19, 54, 134, 146],
        correctAnswer: 54
    },{
        question: "What is 17 multiplied by 9?",
        choices: [26, 108, 134, 153,963],
        correctAnswer: 153
    },{
        question: "What is 149*9 ?",
        choices: [ 158, 1341,1091, 1561],
        correctAnswer: 1341
    }
    ]

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

// animates button on hover
    $('.button').on('mouseenter', function(){
        $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
        $(this).removeClass('active');
      });

//creates div that has questions and answers
    
    function createQuestionElement(index){
        var qElement= $('<div>',{
            id:'question'
        });
        var header = $('<h2>Question ' + (index +1) + ':</h2>');
        qElement.append(header);

        var question =$('<p>').append(questions[index].question);
        qElement.append(question);

        var radioButtons = createRadios(index);
        qElement.append(radioButtons);

        return qElement;

    }

    // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
    // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

    function displayNext(){
        quiz.fadeOut(function(){
            $('#question').remove();

            if(questionCounter<questions.length){
                var nextQuestion= createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();
                if (!(isNaN(selections[questionCounter]))){
                    $('input[value='+selections[questionCounter]+']').prop('checked',true);
                }
               // Controls display of 'prev' button
        if(questionCounter === 1){
            $('#prev').show();
          } else if(questionCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
          }
        }else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
    
    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
      var score = $('<p>',{id: 'question'});
      
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
      
      score.append('You got ' + numCorrect + ' questions out of ' +
                   questions.length + ' right!!!');
      return score;
    } 
            
        
    
})();