import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TaskService} from "../../services/task.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {

  task : any;
  private service = inject(TaskService);
  private router = inject(Router);

  form = new FormGroup({
    task : new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    dueDate: new FormControl('', [Validators.required])
  });

  addTask(){
    this.task = this.form.value;
    this.service.addTask(this.task).subscribe(data => {
      this.router.navigate(['/task-manager']);
    })
  }
}
