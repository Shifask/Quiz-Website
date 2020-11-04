(function() {
  var questions = [{
    question: "In 2009 Indian Premier League who got the title of Player of the series?",
    choices: ["Adam Gilchrist","Sachin Tendulkar","Robin Uthappa","Shane Watson"],
    correctAnswer: 0
  }, {
    question: "Which team won the IPL (2009)??",
    choices: ["Deccan Chargers","Chennai Super Kings","Kolkata Knight Riders","Delhi Daredevils",],
    correctAnswer: 0
  }, {
    question: "Which player scored most runs in IPL (2009)?",
    choices: ["Sanath Jaysuriya","Sachin Tendulkar","Matthew Hayden","Virender Sehwag"],
    correctAnswer: 1
  }, {
    question: "Which cricketer has bowled the most number of dot balls in the IPL?",
    choices: ["Praveen Kumar","Lasith Malinga","Harbhajan Singh","Sunil Narine"],
    correctAnswer: 0
  }, {
    question: "Which company replaced DLF as the new title sponsor in 2013 IPL?",
    choices: ["PepsiCo","Hindustan Unilever","Nokia","Patanjali"],
    correctAnswer: 0
  }, {
    question: "Which International star performed in the opening ceremony of 2013 IPL?",
    choices: ["Jennifer Lopez","Akon","Pitbull","None of the above"],
    correctAnswer: 2
  }, {
    question: "Which team won the 2014 Indian Premier League tournament?",
    choices: ["Kolkata Knight Riders","Chennai Super Kings","Deccan Chargers","Royal Challengers Bangalore"],
    correctAnswer: 0
  }, {
    question: "Which team won Indian Premier League 2010?",
    choices: ["Chennai Super Kings","Kolkata Knight Riders","Deccan Chargers","Delhi Daredevils"],
    correctAnswer: 0
  }, {
    question: "Who hit the first century of IPL 2012?",
    choices: ["Manish Pandey","Ajinkya Rahane","Virat Kohli","Ambati Rayudu"],
    correctAnswer: 0
  }, {
    question: "In IPL 2010, who gave the best Debut Performance?",
    choices: ["Kieron Pollard","Yusuf Pathan","Praveen Tambe","Ambati Rayudu"],
    correctAnswer: 0
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
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
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
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
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
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