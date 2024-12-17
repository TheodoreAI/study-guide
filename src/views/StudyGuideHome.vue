<template>
  <div class="container-fluid">
    <div class="row justify-content-between">
      <div class="col-6 text-center">
        <div class="border border-dark rounded-2 mb-2 text-start p-3">
          <div class="d-flex justify-content-between">
            <h2 for="chapters" class="form-label fw-bold">
              Chapter {{ currentChapter + 1 }} - {{ chapters.length }}
            </h2>
            <nav aria-label="Chapters to select">
              <ul class="pagination">
                <li class="page-item">
                  <a @click="previousChapter()" class="page-link" href="#"
                    >Previous</a
                  >
                </li>
                <li>
                  <a @click="nextChapter()" class="page-link" href="#">Next</a>
                </li>
                <li>
                  <a
                    @click="addChapter()"
                    class="page-link bg-success text-light rounded-1"
                    href="#"
                    >Add +</a
                  >
                </li>
              </ul>
            </nav>
          </div>
          <h3 class="fw-bold">Questions and Answers</h3>
          <p class="fst-italic">
            Here you can input the questions and answers for the study guide.
            You can add as many questions as you like.
          </p>
          <form @submit.prevent="createStudyMethod()">
            <div
              class="mb-3"
              v-for="(q, i) in chapters[currentChapter].questionsAndAnswers"
              :key="q.id"
            >
              <div class="row fw-bold">
                <div class="col align-self-start">
                  <label :for="q.id" class="form-label fs-5"
                    >{{ i + 1 }}. Concept</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    :id="q.id"
                    aria-describedby=""
                    v-model="q.question"
                  />
                </div>
                <div class="col align-self-center">
                  <label :for="q.id" class="form-label fs-5"> Answer</label>
                  <textarea
                    type="text"
                    class="form-control"
                    :id="q.id"
                    aria-describedby=""
                    v-model="q.answer"
                  />
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-center my-3 py-3">
              <button
                @click="addQuestion()"
                type="add"
                class="btn btn-success rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-plus-circle"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
                  />
                  <path
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
                  />
                </svg>
              </button>
            </div>
            <div class="col">
              <h4 class="fw-bold">Select a type</h4>
              <p class="fw-bold">
                Here you can select the specific kind of study guide.
              </p>
              <div class="dropdown text-start">
                <button
                  class="btn btn-primary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Select Study Guide Type
                </button>
                <ul class="dropdown-menu">
                  <a
                    v-for="method in methodsAvailable"
                    :key="method.id"
                    class="dropdown-item"
                    @click="chooseMethod(method.id)"
                    >{{ method.name }}</a
                  >
                </ul>
              </div>
              <button type="submit" class="btn btn-primary mt-3">Study</button>
            </div>
          </form>
        </div>
      </div>
      <div class="col p-3 mb-2 border border-dark rounded-2">
        <div class="border border-3 rounded-2 p-3 fw-bold fst-italic">
          <div class="d-flex justify-content-end">
            <button @click="toggleAudioControls()" class="btn btn-info">
              Signal Learning
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-person-workspace"
                viewBox="0 0 16 16"
              >
                <path
                  d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"
                />
                <path
                  d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z"
                />
              </svg>
            </button>
          </div>
          <div v-show="audioControls">
            <p>
              Studying with a signal noise or chewing gum can help you focus.
            </p>
            <p>Would you like to study with a background noise?</p>
            <div class="d-flex justify-content-start p-3">
              <div class="dropdown text-center">
                <button
                  class="btn btn-info dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Select Signal
                </button>
                <ul class="dropdown-menu">
                  <a
                    v-for="signal in signalsAvailable"
                    :key="signal.id"
                    class="dropdown-item"
                    @click="chooseSignal(signal.id)"
                    >{{ signal.name }}</a
                  >
                </ul>
              </div>
            </div>
            <label class="form-label">Add your own audio</label>
            <input type="file" accept="audio/*" />
            <audio class="d-flex fs-5" controls loop>
              <source :src="selectedSignal" type="audio/ogg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
        <h3 class="fw-bold text-center">
          {{ selectedMethod }}
        </h3>
        <div v-if="selectedMethod === 'Drag and Drop'">
          <p class="fst-italic">Drag and Drop Questions and Answers</p>
          <div class="d-flex justify-content-end">
            {{ numSortedCorrectly }} / {{ numToSort }}
          </div>
          <div
            v-for="(question, index) in chapters[currentChapter]
              .questionsAndAnswers"
            :key="index"
            class="row"
          >
            <div class="col">
              <div
                class="draggable border border-dark rounded-2 p-2 bg-light"
                draggable="true"
                @dragstart="onDragStart($event, question)"
              >
                {{ question.question }}
              </div>
            </div>
            <div class="col">
              <div
                class="droppable border border-dark rounded-2 p-2"
                @dragover="onDragOver($event)"
                @drop="onDrop($event, question)"
              >
                {{ question.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "StudyGuideHomeView",
  data() {
    return {
      quizQuestions: [], //* this will be the randomized questions
      methodsAvailable: [
        { id: "flashCards", name: "Flash Cards", selected: false },
        { id: "multipleChoice", name: "Multiple Choice", selected: false },
        { id: "dragAndDrop", name: "Drag and Drop", selected: false },
      ],
      chapters: [
        {
          id: 1,
          name: "Chapter 1",
          questionsAndAnswers: [
            {
              id: 0,
              question: "Programming Language",
              answer:
                "a written system of instructions that allows humans to communicate with computers",
              method: "flashCards",
            },
            {
              id: 1,
              question: "Programming language specification",
              answer:
                " a documentation artifact that defines a programming language so that users and implementors can agree on what programs in that language mean.",
              method: "flashCards",
            },
          ],
        },
        { id: 2, name: "Chapter 2", questionsAndAnswers: [] },
        { id: 3, name: "Chapter 3", questionsAndAnswers: [] },
      ],
      signalsAvailable: [
        {
          id: "whiteNoise",
          name: "White Noise",
          selected: false,
          path: "../assets/waves-breaking.mp3",
        },
        {
          id: "waves",
          name: "Waves",
          selected: false,
          path: "../assets/waves-breaking.mp3",
        },
        {
          id: "rain",
          name: "Rain",
          selected: false,
          path: "../assets/rain.mp3",
        },
      ],
      currentChapter: 0,
      selectedMethod: "Drag and Drop",
      audioControls: false,
      selectedSignal: "../assets/waves-breaking.mp3",
      draggedQuestion: null,
      numSortedCorrectly: 0,
      numToSort: 0,
    };
  },
  methods: {
    chooseMethod(method) {
      this.methodsAvailable.forEach((m) => {
        if (m.id === method) {
          m.selected = true;
          this.selectedMethod = m.name;
        }
      });
    },
    chooseSignal(signal) {
      this.signalsAvailable.forEach((s) => {
        if (s.id === signal) {
          s.selected = true;
          this.selectedSignal = s.path;
        }
      });
    },
    addQuestion() {
      this.chapters[this.currentChapter].questionsAndAnswers.push({
        id: this.chapters[this.currentChapter].questionsAndAnswers.length,
        question: "",
        answer: "",
        method: this.selectedMethod,
      });
    },
    toggleAudioControls() {
      this.audioControls = !this.audioControls;
    },
    createStudyMethod() {
      //* make a study method for quizzing
      //* randomize the questions
      //* create a timer for the quiz
      //* create a score for the quiz
      const newOrder = JSON.parse(
        JSON.stringify(this.chapters[this.currentChapter].questionsAndAnswers)
      ).sort(() => Math.random() - 0.5);
      this.quizQuestions = newOrder;
      this.numToSort = this.quizQuestions.length;
    },
    nextChapter() {
      if (this.currentChapter < this.chapters.length - 1) {
        this.currentChapter++;
      }
    },
    previousChapter() {
      if (this.currentChapter > 0) {
        this.currentChapter--;
      }
    },
    addChapter() {
      this.chapters.push({
        id: this.chapters.length + 1,
        name: `Chapter ${this.chapters.length + 1}`,
        questionsAndAnswers: [],
      });
    },
    onDragStart(event, question) {
      this.draggedQuestion = question;
      event.dataTransfer.effectAllowed = "move";
    },
    onDragOver(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    onDrop(event, answer) {
      event.preventDefault();
      console.log("answer", answer, "question", this.draggedQuestion);
      if (this.draggedQuestion.id === answer.id) {
        alert("Correct match!");
        this.numSortedCorrectly++;
      } else {
        alert("Incorrect match. Try again.");
      }
      this.draggedQuestion = null;
    },
  },
};
</script>
