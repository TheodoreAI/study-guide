<template>
  <div class="container-fluid">
    <div class="row justify-content-between">
      <div v-if="!quizStarted" class="col-6 text-center">
        <div class="d-flex flex-column border border-dark p-3 mb-3 rounded-2">
          <h4 class="fw-bold">Select a type</h4>
          <p class="fw-bold">
            Here you can select the specific kind of study method you want to
            engage in.
          </p>
          <div class="dropdown text-center">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ selectedMethod || "Select a Method" }}
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
        </div>
        <div class="border border-dark rounded-2 mb-2 text-start p-3">
          <div class="d-flex justify-content-between">
            <div class="">
              <button
                @click="addChapter()"
                class="btn btn-light bg-secondary text-dark fw-bold p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-plus-circle text-light"
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
              <button
                class="btn btn-light bg-success text-dark fw-bold p-2 mx-2"
                @click="saveDataIntoLocalJson()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-floppy2-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M12 2h-2v3h2z" />
                  <path
                    d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V2.914a1.5 1.5 0 0 0-.44-1.06L14.147.439A1.5 1.5 0 0 0 13.086 0zM4 6a1 1 0 0 1-1-1V1h10v4a1 1 0 0 1-1 1zM3 9h10a1 1 0 0 1 1 1v5H2v-5a1 1 0 0 1 1-1"
                  />
                </svg>
              </button>
            </div>
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
              </ul>
            </nav>
          </div>
          <h3 class="fw-bold my-3">Concepts and Definitions</h3>
          <p class="fst-italic my-3 text-start">
            Here you can input the concepts and definitions for the study
            session. You can add as many as you like. Remember, this can be a
            study guide for textbook chapters, sections, articles, or any facts
            that you would like to learn through structured practice.
          </p>
          <form>
            <div
              class="mb-3"
              v-for="(q, i) in chapters[currentChapter].conceptsAndDefinitions"
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
                    v-model="q.concept"
                  />
                </div>
                <div class="col align-self-center">
                  <label :for="q.id" class="form-label fs-5">Definition</label>
                  <textarea
                    type="text"
                    class="form-control"
                    :id="q.id"
                    aria-describedby=""
                    v-model="q.definition"
                  />
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-center my-3 py-3">
              <button
                @click.prevent="addQuestion()"
                type="add"
                class="btn btn-success rounded-3 rounded-circle p-2"
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
              <button
                @click.prevent="popQuestion()"
                type="remove"
                class="btn btn-danger rounded-3 rounded-circle p-2 mx-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-dash-circle"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
                  />
                  <path
                    d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"
                  />
                </svg>
              </button>
            </div>
          </form>
          <div class="d-flex justify-content-end">
            <button
              @click="downloadChapter()"
              class="btn btn-lg btn-light text-dark fw-bold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-file-earmark-arrow-down-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1m-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="col p-3 mb-2 border border-dark rounded-2">
        <div class="border border-3 rounded-2 mb-2 p-3 fw-bold fst-italic">
          <div v-show="selectedSignalName.length">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-soundwave soundwave-animation"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5m-2 2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5m4 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5m-6 1.5A.5.5 0 0 1 5 6v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m8 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m-10 1A.5.5 0 0 1 3 7v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5m12 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5"
              />
            </svg>
          </div>
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
            <div class="d-flex justify-content-start">
              <div class="dropdown text-center">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ selectedSignalName || "Select a Signal" }}
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
            <audio :src="selectedSignal" class="py-3" controls loop></audio>
          </div>
        </div>
        <h3 class="fw-bold text-center">
          {{ selectedMethod }}
        </h3>
        <div v-if="selectedMethod === 'Drag and Drop' && quizStarted">
          <p class="fst-italic">Drag and Drop Concepts and Definitions</p>
          <div class="d-flex justify-content-end fw-bold">
            {{ numSortedCorrectly }} / {{ numToSort }}
          </div>
          <div class="row">
            <div class="col">
              <div
                v-for="(question, index) in quizConcepts"
                :key="index"
                class="card draggable border border-dark rounded-2 p-2 my-2"
                draggable="true"
                @dragstart="onDragStart($event, question)"
              >
                <p class="card-text">{{ question.concept }}</p>
              </div>
            </div>
            <div class="col">
              <div
                v-for="(answer, index) in quizDefinitions"
                :key="index"
                class="card droppable border border-dark rounded-2 p-2 my-2"
                @dragover="onDragOver($event)"
                @drop="onDrop($event, answer)"
              >
                <p class="card-text">{{ answer.definition }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="selectedMethod === 'Fill in the Blank' && quizStarted">
          <p class="fst-italic">Fill in the Blank using the writing pen.</p>
          <div
            v-for="(a, index) in quizDefinitions"
            :key="a.id"
            class="border border-dark rounded-2 p-2 my-2 text-center"
          >
            <div class="row p-2">
              <div class="col-5">
                <p class="fs-5 text-start">{{ a.definition }}</p>
              </div>
              <div class="col-3 my-auto">
                <input
                  class="form-control"
                  type="form-control"
                  v-model="fillInTheBlank[index]"
                  required
                />
              </div>
              <div class="col my-auto">
                <input
                  type="submit"
                  class="btn btn-primary"
                  @click="checkConcept(a, fillInTheBlank[index])"
                  value="Check"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-show="selectedMethod === 'Handwriting' && quizStarted">
          <p class="fst-italic">
            Write the name of the concept here. The system will check if you got
            it right. You can use a stylus or your finger to write the answer.
            It also works with a mouse or trackpad.
          </p>
          <div
            class="border border-dark rounded-2 p-2 my-2 text-start w-50 mx-auto"
          >
            <div
              class="d-flex justify-content-between p-3 m-3 border border-rounded"
            >
              <div>
                {{ currentDefinition }}
              </div>
              <button class="btn btn-primary" @click="nextDefinition()">
                Next
              </button>
            </div>
            <p
              class="rounded-3 text-center fw-bold bg-secondary text-light m-3"
              :class="{
                'bg-danger': handWrittenAnswer === 'Not quite',
                'bg-success': handWrittenAnswer === 'Correct!',
              }"
            >
              {{ handWrittenAnswer }}
            </p>
          </div>

          <div id="editor-container" touch-action="none" ref="editor"></div>
        </div>
        <p class="fst-italic fs-5 text-center">
          Time Remaining {{ timerDisplay }}
        </p>
        <div class="d-flex justify-content-center">
          <button class="btn btn-primary mx-2" @click="startQuiz()">
            Start Quiz
          </button>
          <button class="btn btn-danger" @click="stopQuiz()">Stop Quiz</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { jsPDF } from "jspdf";
import { Editor } from "iink-ts";
import chaptersContent from "../data/chapters.json";
// @ is an alias to /src
export default {
  name: "StudyGuideHomeView",
  data() {
    return {
      studyGuideMode: "easy", //* This can change to 'hard' for case-sensitive comparison
      handWrittenAnswer: "",
      currentDefinitionIndex: 0,
      currentConcept: "",
      currentDefinition: "", //* ANOTHER TYPE OF STUDY METHOD 3
      fillInTheBlank: [], //* ANOTHER TYPE OF STUDY METHOD 1
      quizStarted: false,
      quizDefinitions: [], //* ANOTHER TYPE OF STUDY METHOD 2 - this will be the randomized definitions
      quizConcepts: [], //* this will be the randomized concepts
      methodsAvailable: [
        { id: "handwriting", name: "Handwriting", selected: false },
        { id: "fillInTheBlank", name: "Fill in the Blank", selected: false },
        { id: "dragAndDrop", name: "Drag and Drop", selected: false },
      ],
      chapters: [
        {
          id: 1,
          name: "Chapter 1",
          conceptsAndDefinitions: [
            {
              id: 0,
              concept: "C",
              definition:
                "a 'low-level' compiled language most commonly used to program operating systems.",
            },
            {
              id: 1,
              concept: "Java",
              definition:
                "a high-level programming language developed by Sun Microsystems.",
            },
          ],
        },
      ],
      signalsAvailable: [
        {
          id: "pencil",
          name: "Pencil",
          selected: false,
          path: require("../assets/pencil.mp3"),
        },
        {
          id: "waves",
          name: "Waves",
          selected: false,
          path: require("../assets/waves-breaking.mp3"),
        },
        {
          id: "rain",
          name: "Rain",
          selected: false,
          path: require("../assets/rain.mp3"),
        },
      ], //* https://pixabay.com/sound-effects/search/waves/
      selectedSignalName: "",
      currentChapter: 0,
      selectedMethod: "Fill in the Blank",
      audioControls: false,
      selectedSignal: require("../assets/waves-breaking.mp3"),
      numSortedCorrectly: 0,
      numToSort: 0,
      timer: null,
      timerDisplay: null,
      minutes: 10,
      editor: null,
    };
  },
  methods: {
    async chooseMethod(method) {
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
          this.selectedSignalName = s.name;
        }
      });
    },
    addQuestion() {
      this.chapters[this.currentChapter].conceptsAndDefinitions.push({
        id: this.chapters[this.currentChapter].conceptsAndDefinitions.length,
        concept: "",
        definition: "",
        method: this.selectedMethod,
      });
    },
    popQuestion() {
      //* lets remove the last question
      this.chapters[this.currentChapter].conceptsAndDefinitions.pop();
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
        JSON.stringify(
          this.chapters[this.currentChapter].conceptsAndDefinitions
        )
      ).sort(() => Math.random() - 0.5);
      this.quizConcepts = newOrder;
      this.numToSort = this.quizDefinitions.length;
    },
    startQuiz() {
      //* randomize the questions
      //* create a timer for the quiz
      //* create a score for the quiz
      [this.quizDefinitions, this.quizConcepts] = this.randomizeAndReturn();
      this.numToSort = this.quizDefinitions.length;
      this.startTimer(this.minutes);
      this.quizStarted = true;
    },
    randomizeAndReturn() {
      let conceptsAndDefinitions = [];
      this.chapters[this.currentChapter].conceptsAndDefinitions.forEach(
        (qa) => {
          conceptsAndDefinitions.push(qa);
        }
      );

      //* shuffle the answers
      let randomizedAnswers = this.shuffle([...conceptsAndDefinitions]); //* create a shallow copy to avoid mutating the original array

      //* shuffle the questions
      let randomizedQuestions = this.shuffle([...conceptsAndDefinitions]);
      return [randomizedAnswers, randomizedQuestions];
    },
    shuffle(array) {
      //* https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/#
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        // swap array[i] with the element at random index
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    stopQuiz() {
      this.quizStarted = false;
      this.startTimer(0);
    },
    startTimer(minutes) {
      if (minutes === 0) {
        clearInterval(this.timer);
        this.timerDisplay = "00:00";
        return;
      }
      let min = minutes;
      let sec = 0;
      this.timerDisplay = `${min}:00`;
      this.timer = setInterval(() => {
        if (sec === 0) {
          if (min === 0) {
            clearInterval(this.timer);
            return;
          }
          min--;
          sec = 59;
        } else {
          sec--;
        }
        this.timerDisplay =
          (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
      }, 1000);
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
        conceptsAndDefinitions: [],
      });
    },
    //* https://www.w3schools.com/html/html5_draganddrop.asp
    //* https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
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
      if (this.draggedQuestion.id === answer.id) {
        alert("Correct match!");
        this.numSortedCorrectly++;
        //* remove the question from the list
        this.removeQuestion(this.draggedQuestion, this.quizConcepts);
        this.removeQuestion(answer, this.quizDefinitions);
      } else {
        alert("Incorrect match. Try again.");
      }
      this.draggedQuestion = null;
    },
    removeQuestion(question, arrayToRemoveFrom) {
      const index = arrayToRemoveFrom.indexOf(question);
      if (index > -1) {
        arrayToRemoveFrom.splice(index, 1);
      }
    },
    downloadChapter() {
      //* usage of a library is not required, but it is a good example of how to use a library
      const doc = new jsPDF({ format: "letter", orientation: "portrait" });
      doc.setFont("helvetica", "bold");

      doc.setFontSize(16);
      doc.text(this.chapters[this.currentChapter].name + "\n", 10, 10);

      // Get the definitions and format them
      const definitions = this.chapters[
        this.currentChapter
      ].conceptsAndDefinitions
        .map((qa) => {
          return `${qa.concept} - ${qa.definition}`;
        })
        .join("\n\n"); // Add double newlines for better spacing
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      // Split text into lines to fit within the page width
      const lines = doc.splitTextToSize(definitions, 180);
      doc.text(lines, 10, 20);
      doc.save(`chapter-${this.currentChapter + 1}.pdf`);
    },
    checkConcept(answer, inputtedConcept) {
      //* lets use lowercase for comparison in easy mode
      if (answer === undefined || inputtedConcept === undefined) {
        return;
      }
      if (this.studyGuideMode === "easy") {
        if (answer.concept.toLowerCase() === inputtedConcept.toLowerCase()) {
          alert("Correct!");
          //* remove the question from the list
          this.removeQuestion(answer, this.quizDefinitions);
          this.fillInTheBlank = [];
        } else {
          alert("Incorrect. Try again.");
        }
      } else {
        if (answer.concept === inputtedConcept) {
          alert("Correct!");
        } else {
          alert("Incorrect. Try again.");
        }
      }
    },
    async initializeEditor() {
      const options = {
        configuration: {
          offscreen: true,
          type: "TEXT",
          protocol: "WEBSOCKET",
          apiVersion: "V4",
          server: {
            scheme: "https",
            host: "webdemoapi.myscript.com",
            applicationKey: process.env.VUE_APP_APPLICATION_KEY,
            hmacKey: process.env.VUE_APP_HMAC_KEY,
          },
          recognition: {
            type: "TEXT",
            text: {
              mimeTypes: ["text/plain"],
            },
          },
        },
      };
      const editor = new Editor(this.$refs.editor, options);
      await editor.initialize();

      editor.events.addEventListener("exported", (event) => {
        const exports = event.detail;
        if (exports && exports["text/plain"]) {
          if (
            exports["text/plain"].toLowerCase() ===
            this.currentConcept.toLowerCase()
          ) {
            this.handWrittenAnswer = "Correct!";
            this.currentConcept = "";
          } else {
            this.handWrittenAnswer = `Not quite -  ${exports["text/plain"]} - ${this.currentConcept}`;
          }
        }
      });
      this.editor = editor;
    },
    nextDefinition() {
      if (
        this.currentDefinitionIndex ===
        this.chapters[this.currentChapter].conceptsAndDefinitions.length - 1
      ) {
        this.currentDefinitionIndex = 0;
      } else {
        this.currentDefinitionIndex += 1;
      }
      const currentQuestion =
        this.chapters[this.currentChapter].conceptsAndDefinitions[
          this.currentDefinitionIndex
        ];
      this.currentDefinition = currentQuestion.definition;
      this.currentConcept = currentQuestion.concept;
      this.handWrittenAnswer = "";
    },
    initHandwritingQuiz() {
      this.currentDefinitionIndex = 0;
      this.currentConcept =
        this.chapters[this.currentChapter].conceptsAndDefinitions[
          this.currentDefinitionIndex
        ].concept;
      this.currentDefinition =
        this.chapters[this.currentChapter].conceptsAndDefinitions[
          this.currentDefinitionIndex
        ].definition;
    },
    saveDataIntoLocalJson() {
      //* save the data to local storage
      localStorage.setItem("chapters", JSON.stringify(this.chapters));
    },
  },
  async mounted() {
    await this.initializeEditor();
    this.initHandwritingQuiz();
    localStorage.getItem("chapters")
      ? (this.chapters = JSON.parse(localStorage.getItem("chapters")))
      : chaptersContent;
  },
};
</script>
<style scoped>
.draggable {
  cursor: grab;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 75px;
}
.droppable {
  cursor: pointer;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 75px;
}
.draggable:hover {
  background-color: rgb(43, 186, 234);
}
.soundwave-animation {
  animation: soundwave-animation 5s infinite;
  border-radius: 50%;
}

@keyframes soundwave-animation {
  from {
    background-color: rgb(251, 249, 249);
    transform: rotate(0deg);
  }
  to {
    background-color: rgb(43, 186, 234);
    transform: rotate(360deg);
  }
}
#editor-container {
  margin: auto;
  width: 800px;
  height: 600px;
  border: 1px solid black;
  border-radius: 5px;
}
</style>
