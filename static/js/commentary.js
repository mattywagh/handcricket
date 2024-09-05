// Function to return a commentary based on the runs scored
function getCommentary(runs) {
    const commentary = {
      1: [
        "A quick single taken by the batsman.",
        "Smart running between the wickets for a single.",
        "A cheeky single, well played."
      ],
      2: [
        "Nicely placed for a couple of runs.",
        "They'll pick up two, good placement in the field.",
        "Comfortable two runs, keeping the scoreboard ticking."
      ],
      3: [
        "Three runs taken, great running!",
        "A well-timed shot and excellent running for three.",
        "Good running, they get three!"
      ],
      4: [
        "What a boundary, right through cover!",
        "Beautiful shot, that's four runs!",
        "Fantastic shot, that's a boundary!"
      ],
      5: [
        "An overthrow running to 5 runs!",
        "5 runs running, supermen!",
        "It's hit the helmet!"
      ],
      6: [
        "Massive shot, into the crowds!",
        "What a strike! Six runs!",
        "Huge six! Straight out of the park!"
      ],
      out: [
        "Oh no, he's out!",
        "What a ball! The batsman is dismissed.",
        "Bowled him! That's the end of the innings."
      ]
    };
  
    // If batsman is out, return a random out commentary
    if (runs === "out") {
      return commentary.out[Math.floor(Math.random() * commentary.out.length)];
    }
  
    // Return a random commentary for the number of runs scored
    return commentary[runs][Math.floor(Math.random() * commentary[runs].length)];
  }
  
  // Function to update the commentary on the webpage
  function displayCommentary(runs) {
    const commentaryLine = getCommentary(runs);
    document.getElementById("commentary-line").innerText = commentaryLine;
  }
  