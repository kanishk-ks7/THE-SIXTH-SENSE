// Athletex PostgreSQL Prisma Seed Script
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import {
  INITIAL_SPORTS,
  INITIAL_DIFFICULTY_LEVELS,
  INITIAL_ASSESSMENT_CYCLES,
  INITIAL_ASSESSMENTS,
  TELEMETRY_MATRIX
} from '../src/services/dbService.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Athletex PostgreSQL Database Seeding...');

  // 1. Seed Sports
  console.log('Inserting Sports catalog...');
  for (const sport of INITIAL_SPORTS) {
    await prisma.sport.upsert({
      where: { id: sport.id },
      update: {
        name: sport.name,
        slug: sport.slug,
        icon: sport.icon,
        color: sport.color,
        description: sport.description,
        popularPositions: sport.popularPositions
      },
      create: {
        id: sport.id,
        name: sport.name,
        slug: sport.slug,
        icon: sport.icon,
        color: sport.color,
        description: sport.description,
        popularPositions: sport.popularPositions
      }
    });
  }

  // 2. Seed Difficulty Levels
  console.log('Inserting Difficulty Levels...');
  for (const level of INITIAL_DIFFICULTY_LEVELS) {
    await prisma.difficultyLevel.upsert({
      where: { id: level.id },
      update: {
        name: level.name,
        label: level.label,
        tagline: level.tagline,
        description: level.description,
        rankOrder: level.rankOrder
      },
      create: {
        id: level.id,
        name: level.name,
        label: level.label,
        tagline: level.tagline,
        description: level.description,
        rankOrder: level.rankOrder
      }
    });
  }

  // 3. Seed Assessment Cycles
  console.log('Inserting Assessment Cycles (Bi-Weekly)...');
  for (const cycle of INITIAL_ASSESSMENT_CYCLES) {
    await prisma.assessmentCycle.upsert({
      where: { id: cycle.id },
      update: {
        cycleNumber: cycle.cycleNumber,
        title: cycle.title,
        startDate: cycle.startDate,
        endDate: cycle.endDate,
        durationWeeks: cycle.durationWeeks,
        status: cycle.status
      },
      create: {
        id: cycle.id,
        cycleNumber: cycle.cycleNumber,
        title: cycle.title,
        startDate: cycle.startDate,
        endDate: cycle.endDate,
        durationWeeks: cycle.durationWeeks,
        status: cycle.status
      }
    });
  }

  // 4. Seed Assessments
  console.log('Inserting Assessments catalog...');
  for (const a of INITIAL_ASSESSMENTS) {
    await prisma.assessment.upsert({
      where: { id: a.id },
      update: {
        slug: a.slug,
        title: a.title,
        category: a.category,
        description: a.description,
        estimatedTime: a.estimatedTime,
        badgeCategory: a.badgeCategory,
        items: a.items
      },
      create: {
        id: a.id,
        slug: a.slug,
        title: a.title,
        category: a.category,
        description: a.description,
        estimatedTime: a.estimatedTime,
        badgeCategory: a.badgeCategory,
        items: a.items
      }
    });
  }

  // 5. Seed Demo Athlete & Administrator
  console.log('Inserting Demo Athlete (Alex Johnson)...');
  const demoPasswordHash = await bcrypt.hash('password123', 10);
  const demoUser = await prisma.user.upsert({
    where: { email: 'alex.athlete@athletex.ai' },
    update: {
      name: 'Alex Johnson',
      passwordHash: demoPasswordHash,
      role: 'ATHLETE'
    },
    create: {
      id: 'demo-user-1',
      name: 'Alex Johnson',
      email: 'alex.athlete@athletex.ai',
      passwordHash: demoPasswordHash,
      role: 'ATHLETE'
    }
  });

  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@athletex.ai').trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'adminPassword123';
  console.log(`Inserting Administrator Account (${adminEmail})...`);
  const adminPasswordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: 'Athletex Administrator',
      passwordHash: adminPasswordHash,
      role: 'ADMIN'
    },
    create: {
      id: 'admin-user-1',
      name: 'Athletex Administrator',
      email: adminEmail,
      passwordHash: adminPasswordHash,
      role: 'ADMIN'
    }
  });

  // 6. Seed User Sport Profiles, Pillars, and Trajectory Records for USER + SPORT + DIFFICULTY
  console.log('Generating dynamic sport profiles and trajectory matrix for demo user...');
  for (const sport of INITIAL_SPORTS) {
    for (const level of INITIAL_DIFFICULTY_LEVELS) {
      const isCurrent = sport.id === 'football' && level.id === 'Beginner';
      const sportBucket = TELEMETRY_MATRIX[sport.id] || TELEMETRY_MATRIX.other;
      const telemetry = sportBucket[level.id] || sportBucket.Beginner;

      // Upsert User Sport Profile
      await prisma.userSportProfile.upsert({
        where: {
          user_sport_level_unique: {
            userId: demoUser.id,
            sportId: sport.id,
            difficultyLevelId: level.id
          }
        },
        update: {
          readiness: telemetry.overallReadiness,
          isCurrentSelected: isCurrent
        },
        create: {
          userId: demoUser.id,
          sportId: sport.id,
          difficultyLevelId: level.id,
          position: 'Forward / Winger',
          height: '178 cm',
          weight: '68 kg',
          age: 17,
          gender: 'Male',
          location: 'Manchester, UK',
          personalBest: '100m Sprint: 11.8s • 14 Goals Season',
          trainingHours: `${telemetry.cycleTrainingHours / 2} hours/week`,
          trainingHoursNumber: Math.round(telemetry.cycleTrainingHours / 2),
          goal: 'Improve performance',
          readiness: telemetry.overallReadiness,
          bio: 'Passionate aspiring athlete striving to build strong technical fundamentals.',
          sportsBackground: 'School varsity team player for 2 seasons.',
          strengths: JSON.stringify(['Ball Control', 'Agility', 'Determination']),
          focusAreas: JSON.stringify(['Tactical Positioning', 'Stamina']),
          preferredTrainingDays: JSON.stringify(['Monday', 'Wednesday', 'Friday', 'Saturday']),
          isCurrentSelected: isCurrent
        }
      });

      // Upsert 4 Pillar Progress records
      const pillars = [
        { type: 'TECHNICAL_SKILL', name: 'Technical Skill', val: telemetry.technicalSkill.value, delta: telemetry.technicalSkill.delta },
        { type: 'PHYSICAL_FITNESS', name: 'Physical Fitness', val: telemetry.physicalFitness.value, delta: telemetry.physicalFitness.delta },
        { type: 'SPORT_IQ', name: 'Sport IQ & Tactical', val: telemetry.sportIQ.value, delta: telemetry.sportIQ.delta },
        { type: 'TRAINING_CONSISTENCY', name: 'Training Consistency', val: telemetry.trainingConsistency.value, delta: telemetry.trainingConsistency.delta }
      ];

      for (const p of pillars) {
        await prisma.userPillarProgress.upsert({
          where: {
            user_sport_level_pillar_unique: {
              userId: demoUser.id,
              sportId: sport.id,
              difficultyLevelId: level.id,
              pillarType: p.type
            }
          },
          update: {
            value: p.val,
            delta: p.delta,
            targetValue: 100
          },
          create: {
            userId: demoUser.id,
            sportId: sport.id,
            difficultyLevelId: level.id,
            pillarType: p.type,
            pillarName: p.name,
            value: p.val,
            delta: p.delta,
            targetValue: 100
          }
        });
      }

      // Upsert Trajectory points
      for (let i = 0; i < telemetry.trajectoryData.length; i++) {
        const point = telemetry.trajectoryData[i];
        await prisma.performanceTrajectoryRecord.upsert({
          where: {
            user_sport_level_cycle_unique: {
              userId: demoUser.id,
              sportId: sport.id,
              difficultyLevelId: level.id,
              cycleOrder: i + 1
            }
          },
          update: {
            label: point.label,
            recordedDate: point.date,
            score: point.score,
            isCurrent: !!point.isCurrent,
            isProjected: !!point.isProjected
          },
          create: {
            userId: demoUser.id,
            sportId: sport.id,
            difficultyLevelId: level.id,
            cycleOrder: i + 1,
            label: point.label,
            recordedDate: point.date,
            score: point.score,
            isCurrent: !!point.isCurrent,
            isProjected: !!point.isProjected
          }
        });
      }
    }
  }

  console.log('✅ Athletex Database Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed execution note:', e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
