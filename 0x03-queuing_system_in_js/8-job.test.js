import kue from 'kue';
import { createPushNotificationsJobs } from './8-job'; // Assuming the file is named 8-job.js

describe('createPushNotificationsJobs', () => {
  let queue;

  beforeEach(() => {
    queue = kue.createQueue();
    queue.testMode.enter();
  });

  afterEach(() => {
    queue.testMode.clear();
    queue.testMode.exit();
  });

  it('should throw an error if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs({}, queue)).toThrowError('Jobs is not an array');
  });

  it('should create jobs in the queue', () => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 4562 to verify your account',
      },
    ];

    createPushNotificationsJobs(jobs, queue);

    expect(queue.testMode.jobs.length).toBe(jobs.length);
    expect(queue.testMode.jobs[0].type).toBe('push_notification_code_3');
    expect(queue.testMode.jobs[1].type).toBe('push_notification_code_3');
  });
   it('displays the correct message when a job is created', () => {
    const jobs = [
      {
        phoneNumber: '4159518782',
        message: 'This is the code 4321 to verify your account'
      },
    ];
    createPushNotificationsJobs(jobs, queue);
    const curJob = queue.testMode.jobs[0];
    const spy = sinon.spy(console, 'log');
    curJob._events.complete();
    expect(spy.calledWith(`Notification job ${curJob.id} completed`)).to.equal(true);
    spy.restore();
  });

  it('displays a correct message forf job progress', () => {
    const jobs = [
      {
        phoneNumber: '4159518782',
        message: 'This is the code 4321 to verify your account'
      },
    ];
    createPushNotificationsJobs(jobs, queue);
    const curJob = queue.testMode.jobs[0];
    const spy = sinon.spy(console, 'log');

    const progress = 75;
    curJob._events.progress(progress);
    expect(spy.calledWith(`Notification job ${curJob.id} ${progress}% complete`)).to.equal(true);
    spy.restore();
  });

  it('displays the correct error message when a job is failed with an error', () => {
    const jobs  = [
      {
        phoneNumber: '4159518782',
        message: 'This is the code 4321 to verify your account'
      },
    ];
    createPushNotificationsJobs(jobs, queue);
    
    const curJob = queue.testMode.jobs[0];
    const spy = sinon.spy(console, 'log');
    const err = 'This job failed';

    curJob._events.failed(err);
    expect(spy.calledWith(`Notification job ${curJob.id} failed: ${err}`)).to.equal(true);
    spy.restore();
  });

  afterEach(() => {
    queue.testMode.clear()
    queue.testMode.exit()
  });
});
