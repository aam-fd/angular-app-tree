import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { TreeService } from './common/services/tree.service';
import { IFolder } from './common/types/folder';
import { IFile } from './common/types/file';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public tree$: Observable<any>;
  private _subscriptionFolders: Subscription;

  public files: Array<IFolder>;
  public openedFolders: Array<IFolder> = [];
  
  constructor(
    private _treeService: TreeService,
  ) {
    this.tree$ = this._treeService.getTree();
  }

  public ngOnInit(): void {
    this._subscriptionFolders = this.tree$.subscribe((element) => {
      this.files = element.tree;
    }); 
  }

  public ngOnDestroy(): void {
    this._subscriptionFolders.unsubscribe();
  }

  public onItemClick(item: IFolder | IFile): void {
    if (!item || item.type !== 'folder') {
      return;
    }
    const index: number = this.openedFolders.indexOf(item);
    if (index !== -1){
      this.openedFolders.splice(index, 1);
    } else {
      this.openedFolders.push(item);
    }
  }

  public isOpen(folder: IFolder): boolean {
    return this.openedFolders.includes(folder);
  }

}
