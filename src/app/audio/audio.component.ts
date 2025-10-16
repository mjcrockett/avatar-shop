import { Component, Input, ViewChild, ElementRef, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser"
import { Subscription, fromEvent, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
// import { InteractionService } from '../../service/interaction.service';

@Component({
    selector: 'audio-default',
    template: `
    <audio #audioPlayer [loop]="loop"></audio>`,
    styles: [`
         .showMe {
             display:block;
             position:absolute;
             z-index:9999;
             width:200px;
             height:200px;
         }
         .hideMe {
             display:none;
         }
      `]
})

export class AudioComponent implements OnInit, OnDestroy {
    source: string;
    noAutoPlay: boolean = false;
    // reference to the element itself
    @ViewChild('audioPlayer', { static: true }) _elementRef!: ElementRef;
    // reference to the actual html5 audio element for events and stuff
    private audioElement: HTMLAudioElement | undefined;
    @Input() loop: boolean = false;
    @Input()
    set audioFile(value: string) {
        this.changeSource(value);
    }
    @Output() isReady$: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() canPlayThrough$: EventEmitter<number> = new EventEmitter<number>();
    @Output() finish$: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() play$: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() pause$: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() timeUpdate$: EventEmitter<number> = new EventEmitter<number>();
    // @Output() failure$: EventEmitter<string> = new EventEmitter<string>();

    private subs: Subscription = new Subscription();


    constructor(private domSanitizer: DomSanitizer,
        // private _interactionService: InteractionService
      ) {
        this.source = "";
     }

    ngOnInit() {

        this.audioElement = this._elementRef.nativeElement as HTMLAudioElement;
        
        this.audioElement.preload = 'auto';
        const play = fromEvent(this.audioElement, 'play');
        const canplaythrough = fromEvent(this.audioElement, 'canplaythrough');
        const ended = fromEvent(this.audioElement, 'ended');
        const pause = fromEvent(this.audioElement, 'pause');
        const timeupdate = fromEvent(this.audioElement, 'timeupdate');

        this.subs.add(play.subscribe(() => {
            this.play$.emit(true);
        }));
        this.subs.add(canplaythrough.subscribe(() => {
            this.canPlayThrough$.emit(this.audioElement?.duration);
            this.play();
        }));
        this.subs.add(ended.subscribe(() => {
            this.finish$.emit(true);
        }));
        this.subs.add(pause.subscribe(() => {
            this.pause$.emit(true);
        }));
        this.subs.add(timeupdate.subscribe(() => {
            this.timeUpdate$.emit(this.CurrentTime);
        }));

        this.isReady$.emit(true);
    }

    changeSource(audio?: string) {

        if (audio) {
            // this.source = <string>this.domSanitizer.bypassSecurityTrustResourceUrl(audio);
            this.source = audio;
        }

        if (this.audioElement) {
            this.audioElement.src = this.source;
            this.audioElement.load();
        }
        else {

            const timer = interval(1000);
            timer.pipe(takeWhile(ev => !this.audioElement, true)).subscribe(() => {
                if (this.audioElement)
                    this.audioElement.src = this.source;
            });
        }
    }

    play() {
        let promise = <any>this.audioElement?.play();
        if (promise !== undefined) {
            promise.then(() => {
                // Autoplay started!
                this.noAutoPlay = false;
            }).catch(() => {
                // Autoplay was prevented.
                // Show a "Play" button so that user can start playback.
                this.noAutoPlay = true;
                // this._interactionService.interactionNeeded = true;
            });
        }
    }

    pause(){
        this.audioElement?.pause();
    }

    setVolume(vol: number){
        if (vol > 1)
            vol = 1;
        else if (vol < 0)
            vol = 0;

        this.CurrentVolume = vol;
    }

    get CurrentVolume(): number {
      if (this.audioElement) {
        return this.audioElement.volume;
      }
      return 0;
    }
    set CurrentVolume(value: number) {
      if (this.audioElement) {
        this.audioElement.volume = value;
      }
    }

    get CurrentTime(): number {
      if (this.audioElement) {
        return this.audioElement.currentTime;
      }
      return 0;
    }
    set CurrentTime(value: number) {
      if (this.audioElement) {
        this.audioElement.currentTime = value;
      }
    }
    
    ngOnDestroy(){
        this.audioElement?.pause();
        this.audioElement?.removeAttribute('src');
        this.audioElement?.load();

        //Clone and replace the element to completely remove any event listeners
        var old_element = this.audioElement;
        var new_element = this.audioElement?.cloneNode(true);
        if (old_element && old_element.parentNode && new_element) {
          old_element.parentNode.replaceChild(new_element, old_element);
        }

        this.subs.unsubscribe();
    }
}