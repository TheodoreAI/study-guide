<template>
  <div class="container-fluid">
    <div class="row justify-content-between">
      <div class="col p-3 mb-2 border border-dark rounded-2">
        <h3 class="fw-bold text-center">
          {{ selectedMethod }}
        </h3>
      </div>
      <div class="col-6 text-center">
        <div class="border border-dark rounded-2 py-3">
          <h1 class="fw-bold">Select a type</h1>
          <p class="fw-bold">
            Here you can select the specific kind of study guide.
          </p>
          <div class="dropdown text-center">
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
        </div>
        <div class="border border-dark rounded-2 my-2 text-start p-3">
          <h2 class="fw-bold">Questions and Answers</h2>
          <p class="fst-italic">
            Here you can input the questions and answers for the study guide.
            You can add as many questions as you like.
          </p>
          <div class="d-flex justify-content-end">
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
          <form>
            <div class="mb-3" v-for="(q, i) in questionsAndAnswers" :key="q.id">
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
            <button type="submit" class="btn btn-primary">Capture</button>
          </form>
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
      methodsAvailable: [
        { id: "flashCards", name: "Flash Cards", selected: false },
        { id: "multipleChoice", name: "Multiple Choice", selected: false },
        { id: "fillInTheBlank", name: "Fill in the Blank", selected: false },
      ],
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
      selectedMethod: "",
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
    addQuestion() {
      this.questionsAndAnswers.push({
        id: this.questionsAndAnswers.length,
        question: "",
        answer: "",
        method: this.selectedMethod,
      });
    },
  },
};
</script>
