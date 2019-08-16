import {Log} from "./log";
import {Exception} from "./exception";
import {Application} from "./application";

export class ApplicationResult {
  public totalCount: number;
  public currentPageNumber: number;
  public applications: Application[];
  public firstPage: number;
  public lastPage: number;
  public pageCount: number;
  public exception: Exception;
}
