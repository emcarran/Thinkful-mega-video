var app = angular.module('myApp', []);

//register a directive
app.directive('megaVideo', function ($sce) {
    return {
        restrict: 'E',
        templateUrl: 'partials/megavideo.html',
        //by setting the scope to true, we are creating a new scope
        scope: true,
        link: function (scope, element, attrs) {
            var videoPlayer = element.find('video')[0];
            //initialize and empty array of sources on scope.sources
            scope.sources = [];
            // whitelist of video formats accepted
            function processSources() {
                var sourceTypes = {
                    webm: {
                        type: 'video/webm'
                    },
                    mp4: {
                        type: 'video/mp4'
                    },
                    ogg: {
                        type: 'video/ogg'
                    },
                }

                for (source in sourceTypes) {
                    if (attrs.hasOwnProperty(source)) {
                        scope.sources.push({
                            type: sourceTypes[source].type,
                            src: $sce.trustAsResourceUrl(attrs[source])
                        });
                    }
                }
            }
            processSources();

            scope.video = {
                play: function () {
                    videoPlayer.play();
                    scope.video.status = 'play';
                },
                pause: function () {
                    videoPlayer.pause();
                    scope.video.status = 'pause';
                },
                stop: function () {
                    videoPlayer.pause();
                    videoPlayer.currentTime = 0;
                    scope.video.status = 'stop';
                },
                togglePlay: function () {
                    scope.video.status == 'play' ? this.pause() : this.play();
                },
                width: attrs.width,
                height: attrs.height
            };
        }
    }
})
