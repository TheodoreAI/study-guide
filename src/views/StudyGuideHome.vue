<template>
  <div class="container-fluid">
    <div class="card m-1 p-3">
      <h1>Study Guide</h1>
      <p>You will be creating a study guide here.</p>
    </div>

    <div class="card m-1 p-3">
      <h2>Select a Study Guide type</h2>
      <p>Here you can select the specific kind of study guide:</p>
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Select Study Guide Type
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">Flash Cards</a>
          <a class="dropdown-item" href="#">Multiple Choice</a>
          <a class="dropdown-item" href="#">True/False</a>
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
    
    };
  },
};
</script>
