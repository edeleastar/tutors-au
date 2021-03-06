function allLos(lotype, course) {
  let allLos = [];
  course.los.forEach(topic => {
    allLos.push(...topic.los.filter(lo => lo.type == lotype));
    topic.los.forEach(lo => {
      if (lo.type == "unit") {
        allLos.push(...lo.los.filter(lo => lo.type == lotype));
      }
    });
  });
  return allLos;
}

let course = null;
let talks = null;
let labs = null;

describe("User page", () => {
  before(function() {
    cy.fixture("ict-skills.json").then(c => {
      course = c;
      talks = allLos("talk", course);
      labs = allLos("lab", course);
    });
  });

  beforeEach(function() {
    cy.visit("https://wit-tutors.github.io/#/course/wit-hdip-comp-sci-2019-ict-skills-1.netlify.com/");
  });

  it("HomePage", function() {
    for (let [i, topic] of course.los.entries()) {
      cy.lo(i, "card-deck card", topic);
    }
  });

  it("Topics", function() {
    for (let topic of course.los) {
      cy.contains(topic.title).click({ force: true });
      cy.wait(100);
      cy.carddeck(topic.los, "card-deck card");
      cy.videodeck(topic.los, "video-deck video-card");
      cy.unitdeck(topic.los);
      //cy.paneltalkdeck(topic.los);
    }
    cy.home();
  });

  it("Walls", function() {
    cy.get("#talk").then(function($a) {
      const href = $a.prop("href");
      cy.visit(href);
      cy.wait(500);
      cy.wall(talks);
    });
    cy.wait(500);
    cy.get("#lab").then(function($a) {
      const href = $a.prop("href");
      cy.visit(href);
      cy.wait(500);
      cy.wall(labs);
    });
  });
});
