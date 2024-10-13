import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TaskService} from "../../services/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {routes} from "../../app.routes";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ProgressSpinnerModule
  ],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent {
  task : any;
  oldTask : any;
  protected loading = true;
  private service = inject(TaskService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form = new FormGroup({
    task : new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    dueDate: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.service.getById(id).subscribe(data => {
        this.oldTask = data;
        this.form = new FormGroup({
          task: new FormControl(this.oldTask.task),
          priority: new FormControl(this.oldTask.priority),
          dueDate: new FormControl(this.oldTask.dueDate),
        })
        this.loading = false;
      })
    }
  }

  editTask(){
    this.task = this.form.value;
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.service.editTask(id, this.task).subscribe(res => {
        this.router.navigate(['/task-manager']);
      })
    }
  }
}
