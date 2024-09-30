import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TaskService} from "../../services/task.service";
import {CommonModule} from "@angular/common";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {TableModule} from "primeng/table";

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ProgressSpinnerModule, TableModule],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.css'
})
export class ViewTaskComponent {
  private service = inject(TaskService);
  protected loading = true;
  tasks : any;

  ngOnInit() {
    this.service.getTask().subscribe(data => {
      this.tasks = data;
      this.loading = false;
    })
  }

  delete(id : string) {
    this.service.deleteTask(id).subscribe(data => {
      console.log(id + "Task Deleted");
      this.ngOnInit();
    })
  }

  toggle(id : string){
    this.service.getById(id).subscribe(data => {
      data.done = !data.done;
      this.service.toggle(id, data).subscribe(data => {
        this.ngOnInit()
      });
    });
  }
}
