'use client';

import React, { useState, useEffect } from 'react';
import { questionSets } from '@/data/questionSets';

export default function InterviewContainer() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [currentResponse, setCurrentResponse] = useState('');
  
  const questions = questionSets.basics;
  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmit = () => {
    if (!currentResponse.trim()) return;

    const newResponses = {
      ...responses,
      [currentQuestion.id]: currentResponse
    };
    setResponses(newResponses);
    localStorage.setItem('interview_responses', JSON.stringify(newResponses));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentResponse('');
    }
  };

  useEffect(() => {
    const savedResponses = localStorage.getItem('interview_responses');
    if (savedResponses) {
      setResponses(JSON.parse(savedResponses));
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>
        <p className="text-lg">{currentQuestion.question}</p>
      </div>

      <div className="space-y-4">
        <textarea
          value={currentResponse}
          onChange={(e) => setCurrentResponse(e.target.value)}
          className="w-full p-2 border rounded-md h-32"
          placeholder="Type your answer here..."
        />
        
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish'}
        </button>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold mb-2">Previous Responses:</h3>
        {Object.entries(responses).map(([questionId, response]) => {
          const question = questions.find(q => q.id === questionId);
          return (
            <div key={questionId} className="mb-4 p-4 bg-gray-50 rounded-md">
              <p className="font-medium">{question?.question}</p>
              <p className="mt-2">{response}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}