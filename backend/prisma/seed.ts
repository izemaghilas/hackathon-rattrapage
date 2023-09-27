import { PrismaClient, Teams, User } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const hashedPassword =
  '$2a$12$77NK1cuwhri3H.PV6g8IEu8JC18DTkZyssmKIEBFM5jg1pP8/7xqm'; // Mot de passe : password

async function insertAdmin() {
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      jobTitle: 'Admin',
      teamId: null, // Remplacez par l'ID de l'équipe par défaut
    },
  });

  // eslint-disable-next-line no-console
  console.log('admin inserted');
}

async function insertUsers(teams: Teams[]) {
  const email1 = 'user@example.com';
  const email2 = 'user1@example.com';
  const email3 = 'user2@example.com';

  const user1 = await prisma.user.create({
    data: {
      email: email1,
      password: hashedPassword,
      role: 'USER',
      firstname: 'Jack',
      lastname: 'Doe',
      jobTitle: 'User',
      teamId: teams[0].id,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: email2,
      password: hashedPassword,
      role: 'USER',
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      jobTitle: 'User',
      teamId: teams[0].id,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: email3,
      password: hashedPassword,
      role: 'USER',
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      jobTitle: 'User',
      teamId: teams[0].id,
    },
  });
  return [user1, user2, user3];

  // eslint-disable-next-line no-console
  console.log('users inserted');
}

async function InsertSkills(users: User[]) {
  await prisma.skill.createMany({
    data: [
      // user 1
      {
        name: 'React',
        level: 75,
        type: 'FRONT',
        userId: users[0].id,
      },
      {
        name: 'Spring boot',
        level: 90,
        type: 'BACK',
        userId: users[0].id,
      },
      {
        name: 'Terrafom',
        level: 90,
        type: 'INFRA',
        userId: users[0].id,
      },
      // user 2
      {
        name: 'Angular',
        level: 75,
        type: 'FRONT',
        userId: users[1].id,
      },
      {
        name: 'Symfony',
        level: 60,
        type: 'BACK',
        userId: users[1].id,
      },
      {
        name: 'Terraform',
        level: 80,
        type: 'INFRA',
        userId: users[1].id,
      },
      // user 3
      {
        name: 'Vue',
        level: 45,
        type: 'FRONT',
        userId: users[2].id,
      },
      {
        name: 'Django',
        level: 30,
        type: 'BACK',
        userId: users[2].id,
      },
      {
        name: 'Docker',
        level: 60,
        type: 'INFRA',
        userId: users[2].id,
      },
    ],
  });
  // eslint-disable-next-line no-console
  console.log('skills inserted');
}

async function insertEvents() {
  await prisma.event.createMany({
    data: [
      {
        title: 'After work',
        description: 'chill :)',
        startDate: new Date('2023-06-13T18:00:00'),
        endDate: new Date('2023-06-14T00:00:00'),
      },
      {
        title: 'Team building',
        description: 'renforcer les liens entre les collaborateurs',
        startDate: new Date('2023-06-11T09:00:00'),
        endDate: new Date('2023-06-11T11:00:00'),
      },
    ],
  });

  // eslint-disable-next-line no-console
  console.log('events inserted');
}

async function insertTeams() {
  const team1 = await prisma.teams.create({
    data: {
      teamName: 'Pole consultants',
    },
  });
  const team2 = await prisma.teams.create({
    data: {
      teamName: 'Monter en competences',
    },
  });

  // eslint-disable-next-line no-console
  console.log('teams inserted');

  return [team1, team2];
}

async function insertQuiz() {
  await prisma.quiz.create({
    data: {
      title: '',
      questions: {
        createMany: {
          data: [
            {
              text: 'Quel langage de programmation ou quelle technologie spécifique souhaitez-vous apprendre en priorité ?',
            },
            {
              text: 'Actuellement, quel langage de programmation ou quelle technologie vous intéresse le plus et pourquoi ?',
            },
            {
              text: "Quels langages de programmation maîtrisez-vous actuellement et à quel niveau de compétence vous situez-vous dans chacun d'eux ?",
            },
            {
              text: 'Avez-vous des projets ou des objectifs spécifiques en tête pour lesquels vous aimeriez utiliser un langage de programmation particulier ?',
            },
            {
              text: "Quels sont les domaines d'application ou les industries qui vous intéressent le plus en tant que développeur, et quelles compétences techniques pensez-vous avoir besoin pour y réussir ?",
            },
            {
              text: 'Pouvez-vous identifier des défis ou des obstacles spécifiques que vous avez rencontrés dans votre travail de développement en raison de vos compétences actuelles en programmation ?',
            },
          ],
        },
      },
    },
  });

  // eslint-disable-next-line no-console
  console.log('quiz inserted');
}

async function resetDB() {
  await prisma.skill.deleteMany({});
  await prisma.training.deleteMany({});
  await prisma.userQuiz.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.answer.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.teams.deleteMany({});
  await prisma.quiz.deleteMany({});

  // eslint-disable-next-line no-console
  console.log('database reset');
}

async function main() {
  await resetDB();
  const teams = await insertTeams();
  await insertAdmin();
  const users = await insertUsers(teams);
  await InsertSkills(users);
  await insertEvents();
  await insertQuiz();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
