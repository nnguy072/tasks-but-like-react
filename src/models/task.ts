export class TaskModel {
  constructor(
    public id: string, 
    public title: string,
    public completed: boolean = false) {}
}