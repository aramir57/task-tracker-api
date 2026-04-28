import 'dotenv/config';
import prisma from '../src/config/db.js';
import bcrypt from 'bcrypt';


async function main() {
    await prisma.category.deleteMany();
    await prisma.task.deleteMany();
    await prisma.project.deleteMany();
    await prisma.user.deleteMany();

    const password123 = await bcrypt.hash('password123', 10);
    const password456 = await bcrypt.hash('password456', 10);

    const user1 = await prisma.user.create({
        data: {
            email: 'tester@email.com',
            username: 'tester',
            password: password123,
            projects: {
                create: {
                    title: 'Project 1',
                    tasks: {
                        create: [
                            {description: 'Task 1 for Project 1', is_completed: false},
                            { description: 'Task 2 for Project 1', is_completed: true}
                            ]
                        }
                    }
                }
            }
});

const user2 = await prisma.user.create({
    data: {
        email: 'user2@email.com',
        username: 'user2',
        password: password456,
        projects: {
            create: {
                title: 'Project 2',
                tasks: {
                    create: [
                        {description: 'Task for Project 2', is_completed: false},
                    ]
                }
            }
        }
    }
});

await prisma.category.createMany({
    data: [
        { name: 'Urgent' },
        { name: 'Important' },
        { name: 'Normal' }
    ]
});

console.log('Database has been seeded successfully');
console.log('User 1 credentials: email: tester@email.com, password: password123');
console.log('User 2 credentials: email: user2@email.com, password: password456');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });